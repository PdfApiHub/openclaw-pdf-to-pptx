import type { PluginEntry } from "@anthropic/openclaw-plugin-sdk";

const API_BASE = "https://pdfapihub.com/api";

async function callApi(
  endpoint: string,
  body: Record<string, unknown>,
  apiKey: string
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CLIENT-API-KEY": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`PDFAPIHub API error (${res.status}): ${text}`);
    }
    throw new Error(
      `PDFAPIHub API error (${res.status}): ${(parsed as any).error || text}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return { success: true, message: "Binary file returned", content_type: contentType };
}

function getApiKey(config: Record<string, unknown>): string {
  const key = (config.apiKey as string) || "";
  if (!key) {
    throw new Error(
      "PDFAPIHub API key not configured. Set it under plugins.entries.convert-pdf-to-pptx in your openclaw.json: either as apiKey (string) or via env.PDFAPIHUB_API_KEY. Get a free key at https://pdfapihub.com"
    );
  }
  return key;
}

function buildBody(params: Record<string, unknown>): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      body[key] = value;
    }
  }
  return body;
}

const plugin: PluginEntry = {
  id: "convert-pdf-to-pptx",
  name: "PDF to PowerPoint",
  register(api) {
    // ─── PDF to PPTX ────────────────────────────────────────
    api.registerTool({
      name: "pdf_to_pptx",
      description:
        "Convert PDF pages into PowerPoint slides (PPTX). Each page is rendered as a high-quality image and embedded on a blank slide. Supports page selection to convert only specific pages. Useful for turning reports into presentations, repurposing brochures as slide decks, and creating training materials.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL to a PDF file." },
          file: { type: "string", description: "Base64-encoded PDF." },
          pages: { type: "string", description: "Page selection: '1-5', '1,3,5' or omit for all pages." },
          output: {
            type: "string",
            enum: ["url", "base64", "file"],
            description: "Output mode. Default: 'url'.",
          },
          output_filename: { type: "string", description: "Custom output filename (e.g. 'slides.pptx')." },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        return callApi("/v1/convert/pdf/pptx", buildBody(params), apiKey);
      },
    });

    // ─── PDF to Images (Slide Thumbnails) ────────────────────
    api.registerTool({
      name: "pdf_slide_thumbnails",
      description:
        "Generate image thumbnails of PDF pages — useful for previewing slides before converting to PPTX. Each page is rendered as a PNG/JPG/WebP image with configurable DPI and dimensions.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL to a PDF file." },
          file: { type: "string", description: "Base64-encoded PDF." },
          pages: { type: "string", description: "Page selection: '1-5' or omit for all." },
          image_format: {
            type: "string",
            enum: ["png", "jpg", "webp"],
            description: "Image format. Default: 'png'.",
          },
          dpi: { type: "number", description: "Render DPI (72-300). Default: 150." },
          width: { type: "number", description: "Resize width in pixels (for thumbnails)." },
          output: {
            type: "string",
            enum: ["url", "base64", "both"],
            description: "Output mode. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        return callApi("/v1/convert/pdf/image", buildBody(params), apiKey);
      },
    });

    // ─── PPT to PDF ──────────────────────────────────────────
    api.registerTool({
      name: "ppt_to_pdf",
      description:
        "Convert a PowerPoint presentation (PPT/PPTX) to PDF. The reverse of pdf_to_pptx — useful when you need a PDF version of a slide deck. Also supports other office formats (DOCX, XLS, etc.).",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL to a PPT/PPTX file." },
          file: { type: "string", description: "Base64-encoded PPT/PPTX." },
          input_format: {
            type: "string",
            enum: ["ppt", "pptx", "odp"],
            description: "Input format. Required for base64 input.",
          },
          output: {
            type: "string",
            enum: ["url", "base64", "file"],
            description: "Output mode. Default: 'url'.",
          },
          output_filename: { type: "string", description: "Custom output filename." },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        return callApi("/v1/convert/docx/pdf", buildBody(params), apiKey);
      },
    });

    // ─── PDF Info ────────────────────────────────────────────
    api.registerTool({
      name: "pdf_info",
      description:
        "Get PDF page count and metadata. Check how many slides the PPTX will have before converting.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL to a PDF file." },
          base64_pdf: { type: "string", description: "Base64-encoded PDF." },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        return callApi("/v1/pdf/info", buildBody(params), apiKey);
      },
    });
  },
};

export default plugin;
