import { getProfile } from "@/lib/sanity/queries";

export default async function Footer() {
  const profile = await getProfile();
  const quote = profile?.footerQuote as string | undefined;
  const author = profile?.footerQuoteAuthor as string | undefined;

  return (
    <footer className="py-14 px-10 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Brighter divider */}
        <div className="w-full h-px bg-white/30 mb-12" />

        {/* Right-aligned quote */}
        <div className="flex flex-col items-end text-right gap-3">
          {quote ? (
            <>
              <p className="text-white text-sm font-light italic max-w-xl leading-relaxed">
                {quote}
              </p>
              {author && (
                <p className="text-white text-xs tracking-[0.2em] uppercase">
                  — {author}
                </p>
              )}
            </>
          ) : (
            /* Fallback until a quote is added in Sanity */
            <p className="text-white text-xs tracking-[0.3em] uppercase">
              Rishabh Lingam
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
