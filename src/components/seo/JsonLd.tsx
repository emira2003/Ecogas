interface JsonLdProps {
  /** One or more schema.org objects. Nulls are skipped. */
  data: (Record<string, unknown> | null)[];
}

/** Renders structured data as JSON-LD script tags (PLAN.md Part G). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <>
      {data
        .filter((d): d is Record<string, unknown> => d !== null)
        .map((d, i) => (
          <script
            key={i}
            type="application/ld+json"
            // "<" is escaped so the JSON can never close the script tag early
            dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
          />
        ))}
    </>
  );
}
