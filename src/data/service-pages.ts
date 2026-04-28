// src/data/service-pages.ts

import type { AppLanguage } from "@/lib/config/i18n";
import {
  getDisplayBusinessName,
  isRentedSite,
} from "@/lib/config/site-config-utils";
import type { ServicePage } from "@/types/service-page";
import type { SiteConfig } from "@/types/site";

type LocalizedText = Record<AppLanguage, string>;

type ServicePageTemplate = Omit<
  ServicePage,
  | "city"
  | "title"
  | "shortTitle"
  | "excerpt"
  | "metaTitle"
  | "metaDescription"
  | "intro"
  | "paragraphs"
> & {
  title: LocalizedText;
  shortTitle: LocalizedText;
  excerpt: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  intro: LocalizedText;
  paragraphs: Record<AppLanguage, string[]>;
};

function fillTemplate(value: string, siteConfig: SiteConfig) {
  const businessName = getDisplayBusinessName(siteConfig);
  const action = isRentedSite(siteConfig)
    ? `Call or visit ${businessName}`
    : `Send a request through ${siteConfig.siteName}`;
  const actionNl = isRentedSite(siteConfig)
    ? `Bel of bezoek ${businessName}`
    : `Verstuur je aanvraag via ${siteConfig.siteName}`;

  return value
    .replaceAll("{city}", siteConfig.city)
    .replaceAll("{siteName}", siteConfig.siteName)
    .replaceAll("{businessName}", businessName)
    .replaceAll("{action}", action)
    .replaceAll("{actionNl}", actionNl);
}

function fillLocalizedText(
  value: LocalizedText,
  siteConfig: SiteConfig
): LocalizedText {
  return {
    en: fillTemplate(value.en, siteConfig),
    nl: fillTemplate(value.nl, siteConfig),
  };
}

function fillLocalizedParagraphs(
  value: Record<AppLanguage, string[]>,
  siteConfig: SiteConfig
) {
  return {
    en: value.en.map((paragraph) => fillTemplate(paragraph, siteConfig)),
    nl: value.nl.map((paragraph) => fillTemplate(paragraph, siteConfig)),
  };
}

const servicePageTemplates: ServicePageTemplate[] = [
  {
    slug: "second-hand-bikes",
    imageUrl: "/images/second-hand.jpg",
    title: {
      en: "Second-Hand Bikes for Students & Expats",
      nl: "Tweedehands fietsen voor studenten en expats",
    },
    shortTitle: {
      en: "Second-Hand",
      nl: "Tweedehands",
    },
    excerpt: {
      en: "Used city bikes for daily rides in {city}.",
      nl: "Tweedehands stadsfietsen voor dagelijks gebruik in {city}.",
    },
    metaTitle: {
      en: "Second-Hand Bikes {city} | Students & Expats",
      nl: "Tweedehands fietsen {city} | Studenten & expats",
    },
    metaDescription: {
      en: "Looking for a second-hand bike in {city}? {action} for practical used bike help for city, station, and campus rides.",
      nl: "Zoek je een tweedehands fiets in {city}? {actionNl} voor praktische fietshulp voor stad, station en campus.",
    },
    intro: {
      en: "In a cycling city like {city}, students and expats need a bike that is reliable, easy to maintain, and ready for daily rides.",
      nl: "In een fietsstad als {city} hebben studenten en expats een fiets nodig die betrouwbaar, onderhoudsvriendelijk en klaar is voor dagelijks gebruik.",
    },
    paragraphs: {
      en: [
        "A useful second-hand bike should have the basics right: dependable brakes, working lights, a comfortable riding position, and practical parts.",
        "For newcomers, buying a used bike can be simpler than a monthly subscription if you want your own bicycle for the full study period or work stay.",
        "{action} if you need help choosing a bike for commuting, errands, campus routes, or daily city cycling in {city}.",
      ],
      nl: [
        "Een goede tweedehands fiets moet de basis op orde hebben: betrouwbare remmen, werkende verlichting, een comfortabele houding en praktische onderdelen.",
        "Voor nieuwkomers kan een gebruikte fiets eenvoudiger zijn dan een maandabonnement als je je eigen fiets wilt voor je studieperiode of verblijf.",
        "{actionNl} als je hulp nodig hebt bij het kiezen van een fiets voor werk, boodschappen, campusritten of dagelijks fietsen in {city}.",
      ],
    },
  },
  {
    slug: "bike-repair",
    imageUrl: "/images/bike-repair.jpg",
    title: {
      en: "Expert Bike Repair Services",
      nl: "Deskundige fietsreparatie",
    },
    shortTitle: {
      en: "Repair",
      nl: "Reparatie",
    },
    excerpt: {
      en: "Help with flat tires, brakes, chains, lights, and daily bike problems.",
      nl: "Hulp bij lekke banden, remmen, kettingen, verlichting en dagelijkse fietsproblemen.",
    },
    metaTitle: {
      en: "Bike Repair {city} | {siteName}",
      nl: "Fietsenmaker {city} | {siteName}",
    },
    metaDescription: {
      en: "Need bike repair in {city}? {action} for help with flat tires, brakes, chains, lights, locks, and practical city cycling issues.",
      nl: "Fietsreparatie nodig in {city}? {actionNl} voor hulp met banden, remmen, kettingen, verlichting, sloten en praktische stadsproblemen.",
    },
    intro: {
      en: "Do not let a broken chain, flat tire, weak brake, or dead light interrupt your commute to class, work, the station, or the city center.",
      nl: "Laat een kapotte ketting, lekke band, zwakke rem of kapot lampje je rit naar college, werk, station of centrum niet onderbreken.",
    },
    paragraphs: {
      en: [
        "Whether you ride an old omafiets, a student bike, a city bike, or an e-bike, practical repair advice starts with understanding the problem.",
        "Students and expats often need quick clarity: can this bike be fixed, is it worth repairing, and what should be checked before riding through {city} again?",
        "Bike repair help usually starts with durable basics: tires, brakes, chains, lights, wheels, saddles, locks, and the parts that make everyday cycling safe.",
      ],
      nl: [
        "Of je nu op een oude omafiets, studentenfiets, stadsfiets of e-bike rijdt, praktisch reparatieadvies begint met begrijpen wat er mis is.",
        "Studenten en expats willen vaak snel duidelijkheid: kan deze fiets worden gemaakt, is reparatie verstandig en wat moet gecontroleerd worden voordat je weer door {city} rijdt?",
        "Fietsreparatie begint vaak bij duurzame basiszaken: banden, remmen, kettingen, verlichting, wielen, zadels, sloten en onderdelen die dagelijks fietsen veilig maken.",
      ],
    },
  },
  {
    slug: "new-bikes",
    imageUrl: "/images/new-bikes.jpg",
    title: {
      en: "New City Bikes",
      nl: "Nieuwe stadsfietsen",
    },
    shortTitle: {
      en: "New Bikes",
      nl: "Nieuwe fietsen",
    },
    excerpt: {
      en: "Reliable new city bikes for commuting and everyday riding.",
      nl: "Betrouwbare nieuwe stadsfietsen voor woon-werkverkeer en dagelijks fietsen.",
    },
    metaTitle: {
      en: "New Bikes {city} | {siteName}",
      nl: "Nieuwe fietsen {city} | {siteName}",
    },
    metaDescription: {
      en: "Looking for a new bike in {city}? {action} for city bike help, personal advice, and practical setup questions.",
      nl: "Op zoek naar een nieuwe fiets in {city}? {actionNl} voor stadsfietshulp, persoonlijk advies en praktische afstelvragen.",
    },
    intro: {
      en: "A new city bike should fit the way you actually ride: daily trips through {city}, station routes, campus routes, work commutes, and weekend errands.",
      nl: "Een nieuwe stadsfiets moet passen bij hoe je echt fietst: dagelijkse ritten door {city}, stationroutes, campusroutes, werkritten en boodschappen.",
    },
    paragraphs: {
      en: [
        "A practical city bike should handle Dutch weather, busy bike lanes, regular parking, and daily commuting.",
        "Good advice covers frame size, riding position, locks, lights, tires, and the small setup choices that make a new bike comfortable.",
        "If you are a student, expat, commuter, or local rider, compare a new bike with a refurbished used bike before you decide.",
      ],
      nl: [
        "Een praktische stadsfiets moet passen bij Nederlands weer, drukke fietspaden, dagelijks parkeren en woon-werkverkeer.",
        "Goed advies gaat over framemaat, zithouding, sloten, verlichting, banden en de kleine afstellingen die een nieuwe fiets comfortabel maken.",
        "Ben je student, expat, forens of lokale fietser? Vergelijk een nieuwe fiets met een gereviseerde tweedehands fiets voordat je kiest.",
      ],
    },
  },
  {
    slug: "bike-accessories",
    imageUrl: "/images/accessories.jpg",
    title: {
      en: "Essential Bike Accessories",
      nl: "Essentiele fietsaccessoires",
    },
    shortTitle: {
      en: "Accessories",
      nl: "Accessoires",
    },
    excerpt: {
      en: "Locks, lights, saddles, and everyday accessories for city riders.",
      nl: "Sloten, verlichting, zadels en dagelijkse accessoires voor stadsfietsers.",
    },
    metaTitle: {
      en: "Bike Locks & Accessories {city}",
      nl: "Fietsaccessoires & sloten {city}",
    },
    metaDescription: {
      en: "Protect your bike in {city} with stronger locks, reliable lights, and practical accessories for students, expats, and daily commuters.",
      nl: "Bescherm je fiets in {city} met sterke sloten, betrouwbare verlichting en praktische accessoires voor studenten, expats en dagelijkse fietsers.",
    },
    intro: {
      en: "In {city}, the right accessories are not decoration. Good locks, working lights, comfortable contact points, and practical parts make daily riding easier.",
      nl: "In {city} zijn goede accessoires geen decoratie. Sterke sloten, werkende verlichting, comfortabele contactpunten en praktische onderdelen maken dagelijks fietsen makkelijker.",
    },
    paragraphs: {
      en: [
        "Security matters in a busy cycling city. A good lock setup should match where and how you park your bike.",
        "Visibility matters too, especially during dark Dutch winters and rainy evenings. Reliable lights are one of the simplest upgrades for student and city bikes.",
        "For longer rides to campus, the station, work, or home, small comfort upgrades like saddles and grips can make daily cycling feel much easier.",
      ],
      nl: [
        "Beveiliging is belangrijk in een drukke fietsstad. Een goed slot moet passen bij waar en hoe je je fiets parkeert.",
        "Zichtbaarheid telt ook, vooral tijdens donkere Nederlandse winters en regenachtige avonden. Betrouwbare verlichting is een simpele verbetering voor studenten- en stadsfietsen.",
        "Voor langere ritten naar campus, station, werk of huis kunnen kleine comfortverbeteringen zoals zadels en handvatten veel verschil maken.",
      ],
    },
  },
  {
    slug: "student-bikes",
    imageUrl: "/images/second-hand.jpg",
    title: {
      en: "Student Bikes for {city}",
      nl: "Studentenfietsen voor {city}",
    },
    shortTitle: {
      en: "Student Bikes",
      nl: "Studentenfietsen",
    },
    excerpt: {
      en: "Reliable student bikes for campus, station, and city rides.",
      nl: "Betrouwbare studentenfietsen voor campus, station en centrum.",
    },
    metaTitle: {
      en: "Student Bikes {city} | Used Bicycles",
      nl: "Studentenfietsen {city} | Tweedehands fietsen",
    },
    metaDescription: {
      en: "Looking for a student bike in {city}? {action} for reliable used bikes and practical cycling advice for students and expats.",
      nl: "Studentenfiets nodig in {city}? {actionNl} voor betrouwbare tweedehands fietsen en praktisch fietsadvies voor studenten en expats.",
    },
    intro: {
      en: "In {city}, a working student bike is not optional. Students and expats need practical bikes for daily routes, campus rides, station trips, and evening plans.",
      nl: "In {city} is een werkende studentenfiets geen luxe. Studenten en expats hebben praktische fietsen nodig voor dagelijkse routes, campusritten, station en avonden in de stad.",
    },
    paragraphs: {
      en: [
        "A useful student bike is often simple: a strong frame, good brakes, working lights, a comfortable position, and parts that can survive daily use.",
        "If you are comparing subscription bikes such as Swapfiets with owning a reliable used bicycle, think about how long you will stay and how you ride.",
        "{action} if you need a student bike, a cheaper used bike, or advice before choosing.",
      ],
      nl: [
        "Een goede studentenfiets is vaak simpel: een sterk frame, goede remmen, werkende verlichting, een comfortabele houding en onderdelen die dagelijks gebruik aankunnen.",
        "Vergelijk je een fietsabonnement zoals Swapfiets met een eigen betrouwbare tweedehands fiets? Denk aan hoe lang je blijft en hoe je fietst.",
        "{actionNl} als je een studentenfiets, goedkopere tweedehands fiets of advies nodig hebt voordat je kiest.",
      ],
    },
  },
  {
    slug: "cheap-bikes",
    imageUrl: "/images/cheap-bikes.jpg",
    title: {
      en: "Cheap Bikes for Students & Expats",
      nl: "Goedkope fietsen voor studenten en expats",
    },
    shortTitle: {
      en: "Cheap Bikes",
      nl: "Goedkope fietsen",
    },
    excerpt: {
      en: "Budget-friendly city bikes with the basic safety checks that matter.",
      nl: "Budgetvriendelijke stadsfietsen met de basischecks die ertoe doen.",
    },
    metaTitle: {
      en: "Cheap Bikes {city} | Students & Expats",
      nl: "Goedkope fietsen {city} | Studenten & expats",
    },
    metaDescription: {
      en: "Need a cheap bike in {city}? {action} for budget bike help for daily city rides.",
      nl: "Goedkope fiets nodig in {city}? {actionNl} voor budgetfietshulp voor dagelijks stadsgebruik.",
    },
    intro: {
      en: "Sometimes you simply need a practical bike for lectures, work, groceries, and station trips. The right budget option should still make sense for {city} traffic.",
      nl: "Soms heb je gewoon een praktische fiets nodig voor college, werk, boodschappen en ritten naar het station. De juiste budgetoptie moet nog steeds passen bij fietsen in {city}.",
    },
    paragraphs: {
      en: [
        "When you need a cheap bike in {city}, you usually want something functional: a solid frame, responsive brakes, working lights, and a lock setup that fits daily city use.",
        "International students and expats who have just arrived often need a bike before they fully understand the local cycling routine.",
        "Cheap should still be practical. Ask whether a budget bike, student bike, or more durable second-hand model makes the most sense for your route.",
      ],
      nl: [
        "Als je een goedkope fiets in {city} nodig hebt, wil je meestal iets functioneels: een stevig frame, goede remmen, werkende verlichting en een slotoplossing die past bij dagelijks stadsgebruik.",
        "Internationale studenten en expats die net zijn aangekomen hebben vaak snel een fiets nodig voordat ze de lokale fietsroutine kennen.",
        "Goedkoop moet nog steeds praktisch zijn. Vraag of een budgetfiets, studentenfiets of duurzamer tweedehands model het best past bij jouw route.",
      ],
    },
  },
];

export function getServicePagesForSite(siteConfig: SiteConfig): ServicePage[] {
  return servicePageTemplates.map((page) => ({
    ...page,
    city: siteConfig.city,
    title: fillLocalizedText(page.title, siteConfig),
    shortTitle: fillLocalizedText(page.shortTitle, siteConfig),
    excerpt: fillLocalizedText(page.excerpt, siteConfig),
    metaTitle: fillLocalizedText(page.metaTitle, siteConfig),
    metaDescription: fillLocalizedText(page.metaDescription, siteConfig),
    intro: fillLocalizedText(page.intro, siteConfig),
    paragraphs: fillLocalizedParagraphs(page.paragraphs, siteConfig),
  }));
}

export function getServicePageBySlugForSite(
  slug: string,
  siteConfig: SiteConfig
): ServicePage | undefined {
  return getServicePagesForSite(siteConfig).find((page) => page.slug === slug);
}

export function getLocalizedServiceCta(lang: AppLanguage) {
  return lang === "nl" ? "Bekijk service" : "View service";
}
