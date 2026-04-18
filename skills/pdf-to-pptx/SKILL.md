---
name: pdf-to-pptx
description: "Convert PDF pages into PowerPoint slides (PPTX). Page selection, slide thumbnails, and PPT-to-PDF reverse conversion. Powered by PDFAPIHub."
---

# PDF to PowerPoint

Convert PDF pages into PowerPoint presentations, generate slide thumbnails, and convert PPT back to PDF.

## Tools

| Tool | Description |
|------|-------------|
| `pdf_to_pptx` | Convert PDF pages into PowerPoint slides |
| `pdf_slide_thumbnails` | Generate image previews of PDF pages |
| `ppt_to_pdf` | Convert PowerPoint presentations back to PDF |
| `pdf_info` | Check page count before converting |

## Setup

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

**Privacy note:** PDFs you convert are uploaded to PDFAPIHub's cloud service for rendering. Files are auto-deleted after 30 days.

Configure your API key in `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "convert-pdf-to-pptx": {
        "enabled": true,
        "apiKey": "your-api-key-here"
      }
    }
  }
}
```

Or use the `env` approach (OpenClaw injects it into `config.apiKey` automatically):

```json
{
  "plugins": {
    "entries": {
      "convert-pdf-to-pptx": {
        "enabled": true,
        "env": {
          "PDFAPIHUB_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

## Usage Examples

**Convert to PowerPoint:**
> Convert this PDF report into a PowerPoint presentation: https://pdfapihub.com/sample-pdfapi-intro.pdf

**Convert specific pages:**
> Turn pages 1-5 of this PDF into slides

**Preview slides:**
> Show me thumbnails of each page before converting

**Convert PPT to PDF:**
> Convert this PowerPoint file to PDF

## Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)
