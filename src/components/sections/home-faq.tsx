import Image from "next/image";
import type { AppLanguage } from "@/lib/config/i18n";
import { getHomeFaqs } from "@/data/home-faqs";
import type { SiteConfig } from "@/types/site";

type HomeFaqProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeFaq({ siteConfig, lang }: HomeFaqProps) {
  const homeFaqs = getHomeFaqs(siteConfig);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm md:p-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        
        {/* Left side: Header & Image */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              FAQ
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              {lang === "nl" ? "Veelgestelde vragen" : "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-zinc-600">
              {lang === "nl" 
                ? "Alles wat je moet weten om aan de slag te gaan." 
                : "Everything you need to know to get started."}
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl">
            <Image
              src="/images/faq.jpg"
              alt={
                lang === "nl"
                  ? "Veelgestelde vragen illustratie"
                  : "FAQ illustration"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 448px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right side: Questions List */}
        <div className="space-y-4">
          {homeFaqs.map((item, index) => (
            <div
              key={`${item.question[lang]}-${index}`}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 transition-all hover:border-zinc-200 hover:shadow-sm"
            >
              <h3 className="mb-3 text-lg font-semibold text-zinc-900">
                {item.question[lang]}
              </h3>
              <p className="leading-relaxed text-zinc-600">{item.answer[lang]}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
