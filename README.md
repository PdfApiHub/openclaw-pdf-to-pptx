# PDF to PowerPoint — OpenClaw Plugin

Convert PDF pages into PowerPoint presentations using the [PDFAPIHub](https://pdfapihub.com) API. This OpenClaw plugin turns PDF pages into slides, generates thumbnails for preview, and converts PPT back to PDF.

## What It Does

Turn any PDF into an editable PowerPoint presentation — each page becomes a high-quality slide. Preview pages as image thumbnails before converting, and convert PPT files back to PDF when needed.

### Features

- **PDF to PPTX** — Each PDF page rendered as a high-quality image on a slide
- **Page Selection** — Convert only specific pages (e.g. `1-5`, `1,3,5`)
- **Slide Thumbnails** — Preview pages as PNG/JPG/WebP images before converting
- **Configurable DPI** — 72-300 DPI for thumbnails (higher = better quality)
- **Thumbnail Resize** — Generate small thumbnails with custom width
- **PPT to PDF** — Convert PowerPoint presentations back to PDF
- **Multiple Formats** — PPT, PPTX, ODP input for PDF conversion
- **Multiple Output Modes** — Download URL, base64 string, or raw file
- **Custom Filenames** — Name your output files

## Tools

| Tool | Description |
|------|-------------|
| `pdf_to_pptx` | Convert PDF pages into PowerPoint slides |
| `pdf_slide_thumbnails` | Generate image previews of PDF pages |
| `ppt_to_pdf` | Convert PowerPoint presentations back to PDF |
| `pdf_info` | Check page count before converting |

## Installation

```bash
openclaw plugins install clawhub:pdf-to-pptx
```

## Configuration

Add your API key in `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "pdf-to-pptx": {
        "enabled": true,
        "env": {
          "PDFAPIHUB_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

## Usage Examples

Just ask your OpenClaw agent:

- *"Convert this PDF into a PowerPoint presentation"*
- *"Turn pages 1-5 into slides"*
- *"Show me thumbnails of each page first"*
- *"Convert this PPTX to PDF"*
- *"How many slides will this PDF make?"*

## Use Cases

- **Presentation Creation** — Turn PDF reports into editable slide decks
- **Sales Collateral** — Convert PDF brochures to PowerPoint for sales teams
- **Training Materials** — Convert PDF guides into slide presentations
- **Conference Talks** — Convert shared PDF decks to PPTX for adding speaker notes
- **Content Repurposing** — Turn PDF reports into executive summary slides
- **Preview Before Convert** — Generate thumbnails to check pages before creating PPTX
- **Round-Tripping** — Convert PDF → PPTX, edit slides, convert back to PDF

## API Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)

## License

MIT
