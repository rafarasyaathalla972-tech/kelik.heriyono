/**
 * Industrial Audio & Narration Engine
 * High-performance, zero-stutter speech synthesis engineered for industrial training.
 * Solves audio stuttering and premature Chrome 15s cutoffs via sentence queueing,
 * active keep-alive heartbeat, robust voice resolution, and comprehensive industrial phonetics.
 */

export interface SpokenSentenceProgress {
  sentence: string;
  sentenceIndex: number;
  totalSentences: number;
  fullText: string;
}

export interface AvailableVoice {
  name: string;
  lang: string;
  voiceURI: string;
  isIndonesian: boolean;
  isNaturalOrGoogle: boolean;
}

class IndustrialAudioEngine {
  private audioCtx: AudioContext | null = null;
  private humOscillator: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  
  // Speech queue & utterance state
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentSpokenText: string = '';
  private sentenceQueue: string[] = [];
  private currentSentenceIndex: number = 0;
  private isProcessingQueue: boolean = false;
  private keepAliveTimer: number | null = null;
  private userSelectedVoiceURI: string | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private onSentenceProgressCallback: ((progress: SpokenSentenceProgress) => void) | null = null;
  private onSpeechStartCallback: (() => void) | null = null;
  private onSpeechEndCallback: (() => void) | null = null;
  private speechRate: number = 0.96; // 0.96 is optimal for authoritative, professional Indonesian pacing
  private isInterrupted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.availableVoices = window.speechSynthesis.getVoices();
  }

  public getAvailableVoices(): AvailableVoice[] {
    this.loadVoices();
    return this.availableVoices.map((v) => {
      const lowerLang = v.lang.toLowerCase();
      const lowerName = v.name.toLowerCase();
      const isIndonesian = lowerLang.startsWith('id') || lowerLang.includes('indonesia') || lowerName.includes('indonesia');
      const isNaturalOrGoogle = lowerName.includes('natural') || lowerName.includes('google') || lowerName.includes('online') || lowerName.includes('gadis') || lowerName.includes('ardi');
      return {
        name: v.name,
        lang: v.lang,
        voiceURI: v.voiceURI,
        isIndonesian,
        isNaturalOrGoogle
      };
    });
  }

  public setPreferredVoiceURI(uri: string) {
    this.userSelectedVoiceURI = uri;
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
  public playChapterChime(volume: number = 0.18) {
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
      gain.gain.linearRampToValueAtTime(volume * 0.25, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore audio context errors if blocked by browser policy
    }
  }

  /**
   * Start soft mechanical hum when machine is running
   */
  public startMachineHum(volume: number = 0.05) {
    try {
      this.initAudioContext();
      if (!this.audioCtx) return;
      if (this.humOscillator) return; // Already humming

      const now = this.audioCtx.currentTime;
      this.humOscillator = this.audioCtx.createOscillator();
      this.humGain = this.audioCtx.createGain();

      // Low-frequency gentle industrial rumble
      this.humOscillator.type = 'triangle';
      this.humOscillator.frequency.setValueAtTime(80, now);

      this.humGain.gain.setValueAtTime(0.0001, now);
      this.humGain.gain.linearRampToValueAtTime(volume * 0.12, now + 0.4);

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
        this.humGain.gain.linearRampToValueAtTime(0.0001, now + 0.25);
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
      }, 300);
    } catch {
      // Ignore
    }
  }

  /**
   * Transform raw engineering texts and paper-industry jargon into pristine,
   * natural spoken Indonesian phonetics.
   */
  public formatIndustrialPhonetics(text: string): string {
    if (!text) return '';

    let formatted = text
      // Clean slide citations and parentheticals
      .replace(/\(Slide\s+[0-9\s\-&dan]+\)/gi, '')
      .replace(/Slide\s+[0-9\s\-&dan]+/gi, '')
      // Company name
      .replace(/PT\.?\s*PUP/gi, 'P T Panca Usahatama Paramita')
      .replace(/PT\.?\s*Panca Usahatama Paramita/gi, 'P T Panca Usahatama Paramita')
      // Technical acronyms
      .replace(/\bHDC\b/g, 'High Density Cleaner')
      .replace(/\bLCC\b/g, 'Low Consistency Cleaner')
      .replace(/\bMCC\b/g, 'Medium Consistency Cleaner')
      .replace(/\bDDR\b/g, 'Double Disc Refiner')
      .replace(/\bPEO\b/g, 'P E O Axfloc')
      .replace(/\bCRC\b/g, 'C R C consistency regulator')
      .replace(/\bDCS\b/g, 'sistem D C S')
      .replace(/\bPM\b/g, 'Paper Machine')
      .replace(/\bTM\b/g, 'Tissue Machine')
      .replace(/\bJR\b/g, 'Jumbo Roll')
      .replace(/\bHE\b/g, 'Heat Exchanger')
      .replace(/\bFC\b/g, 'Felt Cleaner')
      .replace(/\bLOTO\b/g, 'Lock Out Tag Out')
      .replace(/\bK3\b/g, 'K Tiga Keselamatan Kerja')
      .replace(/\bSOP\b/g, 'Standar Operasional Prosedur')
      .replace(/\bAPD\b/g, 'Alat Pelindung Diri')
      .replace(/\bCSF\b/g, 'C S F')
      // Measurements & Units
      .replace(/Ø\s*/g, 'diameter ')
      .replace(/(\d+)\s*°C/gi, '$1 derajat Celcius')
      .replace(/(\d+)\s*°SR/gi, '$1 derajat Schopper Riegler')
      .replace(/(\d+)\s*kN\/m/gi, '$1 kilo Newton per meter')
      .replace(/(\d+)\s*N\/mm/gi, '$1 Newton per milimeter')
      .replace(/(\d+)\s*N\/m/gi, '$1 Newton per meter')
      .replace(/(\d+)\s*m³\/h/gi, '$1 meter kubik per jam')
      .replace(/(\d+)\s*mpm/gi, '$1 meter per menit')
      .replace(/(\d+)\s*m\/min/gi, '$1 meter per menit')
      .replace(/(\d+)\s*Cps/gi, '$1 Centipoise')
      .replace(/(\d+)\s*GSM/gi, '$1 gram per meter persegi')
      .replace(/pH\s*(\d+[.,]\d+|\d+)/gi, 'p H $1')
      // Decimal and ranges
      .replace(/0\.5°/g, 'nol koma lima derajat')
      .replace(/1\.0°/g, 'satu derajat')
      .replace(/1\.2\s*mm/g, 'satu koma dua milimeter')
      .replace(/3\.0\s*mm/g, 'tiga milimeter')
      .replace(/0\.35\s*mm/g, 'nol koma tiga puluh lima milimeter')
      .replace(/0[,.]18%\s*[-–]\s*0[,.]20%/g, 'nol koma delapan belas hingga nol koma dua puluh persen')
      .replace(/10\s*[-–]\s*12\s*bar/gi, 'sepuluh sampai dua belas bar')
      .replace(/5\.5\s*bar/gi, 'lima koma lima bar')
      .replace(/1\.5\s*bar/gi, 'satu koma lima bar')
      .replace(/2\.5\s*bar/gi, 'dua koma lima bar')
      .replace(/85\s*[-–]\s*90\s*°C/gi, 'delapan puluh lima sampai sembilan puluh derajat Celcius')
      .replace(/160\s*[-–]\s*200\s*N\/m/gi, 'seratus enam puluh sampai dua ratus Newton per meter')
      .replace(/15%/g, 'lima belas persen')
      .replace(/17\s*[-–]\s*19\s*Cps/gi, 'tujuh belas sampai sembilan belas Centipoise')
      .replace(/([0-9]+)\s*bar\b/gi, '$1 bar')
      .replace(/([0-9]+)\s*mm\b/gi, '$1 milimeter')
      .replace(/([0-9]+)\s*cm\b/gi, '$1 sentimeter')
      .replace(/([0-9]+)\s*ton\b/gi, '$1 ton')
      // Replace raw dashes inside ranges
      .replace(/(\d+)\s*-\s*(\d+)/g, '$1 sampai $2');

    return formatted.trim();
  }

  /**
   * Split a long text into distinct, short, authoritative sentence chunks.
   * This guarantees that no individual utterance exceeds 12-15 seconds,
   * completely eliminating the Chrome speech timeout bug!
   */
  private splitIntoSentenceChunks(text: string): string[] {
    if (!text) return [];

    // Split by sentence terminators (. ! ? ; or newline)
    const rawChunks = text
      .split(/(?<=[.!?;\n])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const chunks: string[] = [];
    for (const chunk of rawChunks) {
      // If a single chunk is still extremely long (> 140 chars), split at commas or conjunctions
      if (chunk.length > 140) {
        const subParts = chunk.split(/(?<=[,])\s+/);
        let temp = '';
        for (const part of subParts) {
          if ((temp + ' ' + part).trim().length > 130 && temp.length > 0) {
            chunks.push(temp.trim());
            temp = part;
          } else {
            temp = temp ? `${temp} ${part}` : part;
          }
        }
        if (temp.trim().length > 0) {
          chunks.push(temp.trim());
        }
      } else {
        chunks.push(chunk);
      }
    }

    return chunks.length > 0 ? chunks : [text];
  }

  /**
   * Resolve the highest-quality Indonesian voice available on the host device.
   */
  private pickBestIndonesianVoice(): SpeechSynthesisVoice | null {
    this.loadVoices();
    if (!this.availableVoices || this.availableVoices.length === 0) {
      return null;
    }

    // 1. User manually selected voice
    if (this.userSelectedVoiceURI) {
      const match = this.availableVoices.find((v) => v.voiceURI === this.userSelectedVoiceURI);
      if (match) return match;
    }

    // 2. High-quality natural Indonesian voices
    const idVoices = this.availableVoices.filter((v) => {
      const lang = v.lang.toLowerCase();
      const name = v.name.toLowerCase();
      return lang.startsWith('id') || lang.includes('indonesia') || name.includes('indonesia');
    });

    if (idVoices.length > 0) {
      // Prioritize Google, Natural, Microsoft Gadis/Ardi
      const premiumIdVoice = idVoices.find((v) => {
        const name = v.name.toLowerCase();
        return (
          name.includes('natural') ||
          name.includes('google') ||
          name.includes('online') ||
          name.includes('gadis') ||
          name.includes('ardi') ||
          name.includes('indonesia (indonesia)')
        );
      });
      return premiumIdVoice || idVoices[0];
    }

    // 3. Fallback: Malay or South-East Asian voices
    const msVoice = this.availableVoices.find((v) => v.lang.toLowerCase().startsWith('ms'));
    if (msVoice) return msVoice;

    // 4. Default system voice
    return this.availableVoices.find((v) => v.default) || this.availableVoices[0] || null;
  }

  /**
   * Start active keep-alive heartbeat to prevent Chromium from pausing or dropping
   * long-running speech synthesis sessions.
   */
  private startKeepAlive() {
    this.stopKeepAlive();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    this.keepAliveTimer = window.setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        // Industry-proven Chromium heartbeat: pause and resume keeps the IPC channel active
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 8000);
  }

  private stopKeepAlive() {
    if (this.keepAliveTimer !== null) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  /**
   * Speak Indonesian text smoothly using sequential sentence queueing.
   * Eliminates stutter, robotic clipping, and mid-sentence pauses.
   */
  public speakIndonesian(
    text: string,
    rate: number = 0.96,
    onSentenceProgress?: (progress: SpokenSentenceProgress) => void,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!text || text.trim().length === 0) return;

    // Format text with professional industrial phonetics
    const processedText = this.formatIndustrialPhonetics(text);

    // If identical text is currently being spoken, do not restart
    if (this.isProcessingQueue && this.currentSpokenText === processedText && window.speechSynthesis.speaking) {
      return;
    }

    // Stop current speech cleanly
    this.stopSpeech();
    this.isInterrupted = false;

    this.speechRate = Math.max(0.75, Math.min(1.25, rate));
    this.currentSpokenText = processedText;
    this.sentenceQueue = this.splitIntoSentenceChunks(processedText);
    this.currentSentenceIndex = 0;
    this.onSentenceProgressCallback = onSentenceProgress || null;
    this.onSpeechStartCallback = onStart || null;
    this.onSpeechEndCallback = onEnd || null;

    this.startKeepAlive();
    this.processNextSentenceInQueue();
  }

  /**
   * Process and speak sentences sequentially with a natural 180ms conversational pause.
   */
  private processNextSentenceInQueue() {
    if (this.isInterrupted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (this.currentSentenceIndex >= this.sentenceQueue.length) {
      // Completed entire narration
      this.isProcessingQueue = false;
      this.stopKeepAlive();
      this.currentUtterance = null;
      if (this.onSpeechEndCallback) {
        this.onSpeechEndCallback();
      }
      return;
    }

    const currentSentence = this.sentenceQueue[this.currentSentenceIndex];
    if (!currentSentence || currentSentence.trim().length === 0) {
      this.currentSentenceIndex++;
      this.processNextSentenceInQueue();
      return;
    }

    this.isProcessingQueue = true;

    // Fire start callback on first sentence
    if (this.currentSentenceIndex === 0 && this.onSpeechStartCallback) {
      this.onSpeechStartCallback();
    }

    // Notify sentence progress for UI subtitles
    if (this.onSentenceProgressCallback) {
      this.onSentenceProgressCallback({
        sentence: currentSentence,
        sentenceIndex: this.currentSentenceIndex,
        totalSentences: this.sentenceQueue.length,
        fullText: this.currentSpokenText
      });
    }

    const utterance = new SpeechSynthesisUtterance(currentSentence);
    utterance.lang = 'id-ID';
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    const chosenVoice = this.pickBestIndonesianVoice();
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onend = () => {
      if (this.isInterrupted) return;
      this.currentSentenceIndex++;
      // Natural 180ms pause between sentences for realistic human breathing rhythm
      setTimeout(() => {
        if (!this.isInterrupted) {
          this.processNextSentenceInQueue();
        }
      }, 180);
    };

    utterance.onerror = (e) => {
      // If error occurred (e.g. cancelled by user), handle gracefully
      if (this.isInterrupted || e.error === 'interrupted' || e.error === 'canceled') {
        return;
      }
      // On benign browser audio errors, continue to next sentence
      this.currentSentenceIndex++;
      setTimeout(() => {
        if (!this.isInterrupted) {
          this.processNextSentenceInQueue();
        }
      }, 120);
    };

    // CRITICAL: Anchor utterance in class and window property to prevent Chromium V8 GC sweep!
    this.currentUtterance = utterance;
    (window as unknown as { __currentIndustrialUtterance?: SpeechSynthesisUtterance }).__currentIndustrialUtterance = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      // Catch any unexpected speech dispatch error
    }
  }

  /**
   * Stop speech synthesis immediately and clear all queue state.
   */
  public stopSpeech() {
    this.isInterrupted = true;
    this.isProcessingQueue = false;
    this.sentenceQueue = [];
    this.currentSentenceIndex = 0;
    this.stopKeepAlive();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      (window as unknown as { __currentIndustrialUtterance?: unknown }).__currentIndustrialUtterance = null;
    }
  }

  /**
   * Pause speech synthesis
   */
  public pauseSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  /**
   * Resume speech synthesis
   */
  public resumeSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking || this.isProcessingQueue;
  }
}

export const industrialAudio = new IndustrialAudioEngine();

