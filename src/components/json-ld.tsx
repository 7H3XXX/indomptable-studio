/** Structured data for search engines, escaped so no value can close the tag. */
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be inline, and < is escaped below.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\u003c"),
    }}
    type="application/ld+json"
  />
);
