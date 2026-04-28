import Link from "next/link";
import { ArrowRight, Bike, GraduationCap, MapPin } from "lucide-react";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type HomeStudentExpatsProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeStudentExpats({
  siteConfig,
  lang,
}: HomeStudentExpatsProps) {
  const isDutch = lang === "nl";

  const links = [
    {
      href: `/${lang}/services/student-bikes`,
      label: isDutch ? "Studentenfietsen Groningen" : "Student bikes Groningen",
    },
    {
      href: `/${lang}/services/second-hand-bikes`,
      label: isDutch
        ? "Tweedehands fietsen voor studenten"
        : "Used bikes for students",
    },
    {
      href: `/${lang}/services/bike-repair`,
      label: isDutch ? "Fietsenmaker Groningen" : "Bike repair Groningen",
    },
    {
      href: `/${lang}/buurten/zernike-campus`,
      label: isDutch ? "Fietsenmaker nabij Zernike" : "Bike repair near Zernike",
    },
    {
      href: `/${lang}/buurten/groningen-station`,
      label: isDutch
        ? "Fietsenwinkel nabij station"
        : "Bike shop near Groningen Station",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            {isDutch ? "Studenten en expats" : "Students and expats"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            {isDutch
              ? "Net in Groningen? Begin met een fiets die gewoon werkt."
              : "New in Groningen? Start with a bike that simply works."}
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-700">
            {isDutch
              ? `${siteConfig.googleBusinessProfileName} helpt studenten, internationale studenten en expats met betrouwbare tweedehands fietsen, snelle reparaties, verlichting en sloten voor dagelijkse ritten naar Zernike, Hanze, RUG, station en centrum.`
              : `${siteConfig.googleBusinessProfileName} helps students, international students, and expats with reliable used bikes, fast repairs, lights, and locks for daily rides to Zernike, Hanze, RUG, the station, and the city center.`}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
            <GraduationCap className="mt-1 h-5 w-5 text-zinc-500" />
            <div>
              <h3 className="font-semibold text-zinc-900">
                {isDutch ? "Campusritten" : "Campus rides"}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                {isDutch ? "Zernike, Hanze en RUG." : "Zernike, Hanze, and RUG."}
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
            <MapPin className="mt-1 h-5 w-5 text-zinc-500" />
            <div>
              <h3 className="font-semibold text-zinc-900">
                {isDutch ? "Station en centrum" : "Station and center"}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                {isDutch ? "Praktisch voor dagelijks verkeer." : "Practical for daily city travel."}
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
            <Bike className="mt-1 h-5 w-5 text-zinc-500" />
            <div>
              <h3 className="font-semibold text-zinc-900">
                {isDutch ? "Eigen fiets" : "Own your bike"}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                {isDutch ? "Een alternatief voor abonnementen." : "An alternative to subscriptions."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100"
          >
            {item.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </section>
  );
}
