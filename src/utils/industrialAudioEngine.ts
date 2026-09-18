/**
 * Industrial Audio & Narration Engine
 * Solves audio stuttering ("putus-putus"), prevents premature Chromium garbage collection,
 * and provides Web Audio ambient sound effects and chimes for industrial training.
 */

class IndustrialAudioEngine {
  private audioCtx: AudioContext | null = null;
  private humOscillator: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentSpokenText: string = '';
  private isVoiceActive: boolean = true;
  private speechRate: number = 1.0;

  constructor() {
    // Lazy audio context init on user gesture
  }

  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  /**
   * Play clean chapter chime (520Hz -> 659Hz)
   */
  public playChapterChime(volume: number = 0.2) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume * 0.3, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Ignore audio context errors if blocked
    }
  }

  /**
   * Start soft mechanical hum when machine is running
   */
  public startMachineHum(volume: number = 0.08) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      if (this.humOscillator) return; // Already humming

      const now = this.audioCtx.currentTime;
      this.humOscillator = this.audioCtx.createOscillator();
      this.humGain = this.audioCtx.createGain();

      // Soft low-frequency industrial rumble
      this.humOscillator.type = 'triangle';
      this.humOscillator.frequency.setValueAtTime(85, now);

      this.humGain.gain.setValueAtTime(0.001, now);
      this.humGain.gain.linearRampToValueAtTime(volume * 0.15, now + 0.5);

      this.humOscillator.connect(this.humGain);
      this.humGain.connect(this.audioCtx.destination);

      this.humOscillator.start(now);
    } catch {
      // Ignore
    }
  }

  /**
   * Stop mechanical hum smoothly
   */
  public stopMachineHum() {
    try {
      if (this.humGain && this.audioCtx) {
        const now = this.audioCtx.currentTime;
        this.humGain.gain.linearRampToValueAtTime(0.0001, now + 0.3);
      }
      setTimeout(() => {
        if (this.humOscillator) {
          try {
            this.humOscillator.stop();
            this.humOscillator.disconnect();
          } catch {
            // Ignore
          }
          this.humOscillator = null;
        }
        if (this.humGain) {
          try {
            this.humGain.disconnect();
          } catch {
            // Ignore
          }
          this.humGain = null;
        }
      }, 350);
    } catch {
      // Ignore
    }
  }

  /**
   * Speak Indonesian text smoothly without stuttering or premature cutoff
   */
  public speakIndonesian(text: string, rate: number = 1.0, onStart?: () => void, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!text || text.trim().length === 0) return;

    this.speechRate = rate;

    // Avoid re-triggering if the exact same text is already actively speaking
    if (window.speechSynthesis.speaking && this.currentSpokenText === text) {
      return;
    }

    // Cancel existing speech cleanly
    window.speechSynthesis.cancel();
    this.currentSpokenText = text;

    // Format text for natural Indonesian speech pronunciation
    const naturalText = text
      .replace(/Ø/g, 'diameter ')
      .replace(/0\.5°/g, 'nol koma lima derajat')
      .replace(/1\.0°/g, 'satu derajat')
      .replace(/1\.2 mm/g, 'satu koma dua milimeter')
      .replace(/1\.5 bar/g, 'satu koma lima bar')
      .replace(/5\.5 bar/g, 'lima koma lima bar')
      .replace(/kN\/m/g, 'kilo Newton per meter')
      .replace(/N\/mm/g, 'Newton per milimeter')
      .replace(/N\/m/g, 'Newton per meter')
      .replace(/mpm/g, 'meter per menit')
      .replace(/K3/g, 'K tiga')
      .replace(/LOTO/g, 'Lock Out Tag Out');

    const utterance = new SpeechSynthesisUtterance(naturalText);
    utterance.lang = 'id-ID';
    utterance.rate = Math.max(0.75, Math.min(1.25, rate));
    utterance.pitch = 1.0;

    // Pick best available Indonesian voice
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().includes('indonesia'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      (window as unknown as { __currentIndustrialUtterance?: unknown }).__currentIndustrialUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      (window as unknown as { __currentIndustrialUtterance?: unknown }).__currentIndustrialUtterance = null;
      if (onEnd) onEnd();
    };

    // CRITICAL: Anchor utterance in class and window property to prevent Chromium GC premature collection!
    this.currentUtterance = utterance;
    (window as unknown as { __currentIndustrialUtterance?: SpeechSynthesisUtterance }).__currentIndustrialUtterance = utterance;

    // Brief delay to let browser audio queue settle
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 60);
  }

  /**
   * Stop speech synthesis immediately
   */
  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.currentSpokenText = '';
      (window as unknown as { __currentIndustrialUtterance?: unknown }).__currentIndustrialUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }
}

export const industrialAudio = new IndustrialAudioEngine();
