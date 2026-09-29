import pptxgen from 'pptxgenjs';
import { PresentationSlide, PRESENTATION_METADATA } from '../data/presentationDeckData';

/**
 * Utility to convert image URL/imported asset into base64 Data URL for pptxgenjs embedding
 */
async function urlToBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          resolve(null);
        }
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn(`Gagal memuat gambar untuk PPTX: ${url}`, err);
    return null;
  }
}

/**
 * Generate and download genuine Microsoft PowerPoint (.pptx) file
 */
export async function exportPresentationToPptx(
  slides: PresentationSlide[],
  onProgress?: (percent: number, currentSlideTitle: string) => void
): Promise<void> {
  const pptx = new pptxgen();

  // Configure presentation properties
  pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
  pptx.title = PRESENTATION_METADATA.title;
  pptx.author = PRESENTATION_METADATA.authorRole;
  pptx.company = PRESENTATION_METADATA.companyName;
  pptx.subject = 'Materi Pelatihan Terpadu & Katalog Produk Kertas Tisu';
  pptx.revision = '2';

  const total = slides.length;

  for (let i = 0; i < total; i++) {
    const s = slides[i];
    if (onProgress) {
      const pct = Math.round(((i + 1) / total) * 100);
      onProgress(pct, `Menyusun Slide ${i + 1}/${total}: ${s.title}`);
    }

    const slide = pptx.addSlide();

    // 1. Slide Background
    slide.background = { color: 'F8FAFC' };

    // 2. Top Header Ribbon (Corporate Navy)
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.95,
      fill: { color: '0F172A' },
      line: { color: '0284C7', width: 2 }
    });

    // Company Tag & Badge
    slide.addText('PT. PANCA USAHATAMA PARAMITA (PT. PUP)', {
      x: 0.5,
      y: 0.1,
      w: 6.0,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      color: '38BDF8',
      bold: true
    });

    // Slide Title
    slide.addText(s.title, {
      x: 0.5,
      y: 0.32,
      w: 7.2,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      color: 'FFFFFF',
      bold: true
    });

    // Category Badge (Top Right)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.8,
      y: 0.22,
      w: 1.7,
      h: 0.35,
      fill: { color: '1E293B' },
      line: { color: 'F59E0B', width: 1 }
    });
    slide.addText(s.categoryLabel, {
      x: 7.8,
      y: 0.22,
      w: 1.7,
      h: 0.35,
      fontSize: 9,
      fontFace: 'Arial',
      color: 'FCD34D',
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    // Subtitle bar
    slide.addText(s.subtitle, {
      x: 0.5,
      y: 0.68,
      w: 8.8,
      h: 0.22,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: '94A3B8',
      italic: true
    });

    // 3. Slide Content Layout
    const hasImage = Boolean(s.imageSrc);
    const hasTable = Boolean(s.tableData && s.tableData.rows.length > 0);

    if (hasImage && s.imageSrc) {
      // Two-column layout: Left text & bullets, Right Image with caption
      // Left Content Card
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.5,
        y: 1.15,
        w: 4.8,
        h: 3.8,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1 }
      });

      // Explanation Header
      slide.addText('Ringkasan Teknis & Operasional:', {
        x: 0.7,
        y: 1.25,
        w: 4.4,
        h: 0.25,
        fontSize: 10,
        fontFace: 'Arial',
        color: '0F172A',
        bold: true
      });

      // Bullets
      const bulletItems = s.keyPoints.map((pt) => ({
        text: pt,
        options: {
          fontSize: 9,
          fontFace: 'Arial',
          color: '334155',
          bullet: true,
          paraSpaceAfter: 4
        }
      }));

      slide.addText(bulletItems, {
        x: 0.7,
        y: 1.55,
        w: 4.4,
        h: 2.3,
        valign: 'top'
      });

      // Highlight Box / SPG Tip on bottom left
      if (s.salesSpgTips) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.7,
          y: 3.9,
          w: 4.4,
          h: 0.9,
          fill: { color: 'FEF3C7' },
          line: { color: 'F59E0B', width: 1 }
        });
        slide.addText('PANDUAN SALES & SPG:', {
          x: 0.8,
          y: 3.95,
          w: 4.2,
          h: 0.2,
          fontSize: 8.5,
          fontFace: 'Arial',
          color: 'B45309',
          bold: true
        });
        slide.addText(s.salesSpgTips, {
          x: 0.8,
          y: 4.15,
          w: 4.2,
          h: 0.6,
          fontSize: 8,
          fontFace: 'Arial',
          color: '78350F'
        });
      }

      // Right Column: Real Image
      const base64Img = await urlToBase64(s.imageSrc);
      if (base64Img) {
        slide.addImage({
          data: base64Img,
          x: 5.5,
          y: 1.15,
          w: 4.0,
          h: 2.8,
          rounding: true
        });

        // Caption Box underneath image
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 5.5,
          y: 4.05,
          w: 4.0,
          h: 0.85,
          fill: { color: '0F172A' },
          line: { color: '38BDF8', width: 1 }
        });
        slide.addText(s.imageCaption || 'Dokumentasi Resmi Mesin & Fasilitas Pabrik PT. PUP', {
          x: 5.6,
          y: 4.1,
          w: 3.8,
          h: 0.75,
          fontSize: 8,
          fontFace: 'Arial',
          color: 'E2E8F0',
          italic: true
        });
      }
    } else if (hasTable && s.tableData) {
      // Table Layout
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.5,
        y: 1.15,
        w: 9.0,
        h: 3.85,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1 }
      });

      // Bullets summary on top of table
      const bulletItems = s.keyPoints.slice(0, 2).map((pt) => ({
        text: pt,
        options: {
          fontSize: 9,
          fontFace: 'Arial',
          color: '334155',
          bullet: true,
          paraSpaceAfter: 2
        }
      }));

      slide.addText(bulletItems, {
        x: 0.7,
        y: 1.25,
        w: 8.6,
        h: 0.65,
        valign: 'top'
      });

      // Prepare Table Rows
      const headerRow = s.tableData.headers.map((h) => ({
        text: h,
        options: {
          bold: true,
          fill: { color: '0F172A' },
          color: 'FFFFFF',
          fontSize: 8.5,
          align: 'center' as const
        }
      }));

      const bodyRows = s.tableData.rows.map((row, rIdx) =>
        row.map((cell) => ({
          text: cell,
          options: {
            fill: { color: rIdx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
            color: '1E293B',
            fontSize: 8,
            align: 'left' as const
          }
        }))
      );

      slide.addTable([headerRow, ...bodyRows], {
        x: 0.7,
        y: 2.0,
        w: 8.6,
        colW: s.tableData.headers.map(() => 8.6 / s.tableData!.headers.length),
        border: { color: 'CBD5E1', pt: 1 }
      });
    } else {
      // Full Width 2-Card Layout (Text + Highlight Callout)
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.5,
        y: 1.15,
        w: 5.6,
        h: 3.8,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1 }
      });

      slide.addText('Poin-Poin Utama & Panduan Kerja:', {
        x: 0.7,
        y: 1.25,
        w: 5.2,
        h: 0.25,
        fontSize: 11,
        fontFace: 'Arial',
        color: '0F172A',
        bold: true
      });

      const bulletItems = s.keyPoints.map((pt) => ({
        text: pt,
        options: {
          fontSize: 9.5,
          fontFace: 'Arial',
          color: '334155',
          bullet: true,
          paraSpaceAfter: 5
        }
      }));

      slide.addText(bulletItems, {
        x: 0.7,
        y: 1.6,
        w: 5.2,
        h: 3.1,
        valign: 'top'
      });

      // Right Side Feature Card
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 6.3,
        y: 1.15,
        w: 3.2,
        h: 3.8,
        fill: { color: s.highlightBox?.theme === 'amber' ? 'FFFBEB' : s.highlightBox?.theme === 'emerald' ? 'ECFDF5' : 'EFF6FF' },
        line: { color: s.highlightBox?.theme === 'amber' ? 'F59E0B' : s.highlightBox?.theme === 'emerald' ? '10B981' : '3B82F6', width: 1.5 }
      });

      if (s.highlightBox) {
        slide.addText(s.highlightBox.title, {
          x: 6.5,
          y: 1.35,
          w: 2.8,
          h: 0.4,
          fontSize: 11,
          fontFace: 'Arial',
          color: s.highlightBox.theme === 'amber' ? '92400E' : s.highlightBox.theme === 'emerald' ? '065F46' : '1E40AF',
          bold: true
        });

        slide.addText(s.highlightBox.text, {
          x: 6.5,
          y: 1.85,
          w: 2.8,
          h: 1.6,
          fontSize: 9,
          fontFace: 'Arial',
          color: '1E293B',
          valign: 'top'
        });
      }

      if (s.salesSpgTips) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 6.5,
          y: 3.6,
          w: 2.8,
          h: 1.2,
          fill: { color: 'FFFFFF' },
          line: { color: 'E2E8F0', width: 1 }
        });

        slide.addText('Tips Sales & SPG:', {
          x: 6.6,
          y: 3.68,
          w: 2.6,
          h: 0.2,
          fontSize: 8.5,
          fontFace: 'Arial',
          color: 'D97706',
          bold: true
        });

        slide.addText(s.salesSpgTips, {
          x: 6.6,
          y: 3.9,
          w: 2.6,
          h: 0.85,
          fontSize: 8,
          fontFace: 'Arial',
          color: '475569'
        });
      }
    }

    // 4. Slide Footer & Page Number
    slide.addShape(pptx.ShapeType.line, {
      x: 0.5,
      y: 5.15,
      w: 9.0,
      h: 0,
      line: { color: 'CBD5E1', width: 0.5 }
    });

    slide.addText(
      `PT. PUP Paper Mill &bull; Disusun oleh: Kelik Heriyono (Kepala Pabrik) &bull; ${PRESENTATION_METADATA.revision}`,
      {
        x: 0.5,
        y: 5.22,
        w: 7.5,
        h: 0.25,
        fontSize: 8,
        fontFace: 'Arial',
        color: '64748B'
      }
    );

    slide.addText(`Slide ${s.slideNumber} / ${total}`, {
      x: 8.2,
      y: 5.22,
      w: 1.3,
      h: 0.25,
      fontSize: 8,
      fontFace: 'Arial',
      color: '0F172A',
      bold: true,
      align: 'right'
    });

    // 5. Speaker Notes (Accessible in PowerPoint presenter view)
    let fullNotes = `CATATAN PEMBICARA (SPEAKER NOTES):\n${s.speakerNotes}\n\nPENJELASAN LENGKAP:\n${s.explanation}`;
    if (s.salesSpgTips) {
      fullNotes += `\n\nPANDUAN KHUSUS SALES & SPG:\n${s.salesSpgTips}`;
    }
    slide.addNotes(fullNotes);
  }

  // Save / Download PowerPoint File
  await pptx.writeFile({
    fileName: 'Presentasi_Company_Profile_dan_Training_PT_PUP_Kepala_Pabrik.pptx'
  });
}
