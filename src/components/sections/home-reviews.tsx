import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type HomeReviewsProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-current" : "text-zinc-200 fill-current"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function HomeReviews({ siteConfig, lang }: HomeReviewsProps) {
  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          {lang === "nl" ? "Wat onze klanten zeggen" : "What our customers say"}
        </h2>
        <p className="mt-3 text-lg text-zinc-600">
          {lang === "nl"
            ? "Ervaringen van klanten die langskwamen voor fietsen, reparaties en lokale hulp."
            : "Customer experiences from bike purchases, repairs, and local support."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {siteConfig.reviews.map((review) => (
          <article
            key={`${review.reviewerName}-${review.source}`}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {review.source}
                </span>
              </div>
              <blockquote className="mb-6 text-zinc-700 leading-relaxed">
                {review.reviewText}
              </blockquote>
            </div>

            <div className="flex items-center gap-4 border-t border-zinc-100 pt-4">
              <div
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-800 shadow-sm"
              >
                {getInitials(review.reviewerName)}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{review.reviewerName}</p>
                {review.reviewerRole && (
                  <p className="text-sm text-zinc-500">{review.reviewerRole}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
