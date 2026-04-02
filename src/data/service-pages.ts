// src/data/service-pages.ts

import type { AppLanguage } from "@/lib/config/i18n";
import type { ServicePage } from "@/types/service-page";

export const servicePages: ServicePage[] = [
  {
    slug: "second-hand-bikes",
    city: "Groningen",
    imageUrl: "/images/second-hand.jpg",
    title: {
      en: "Affordable Second-Hand Bikes",
      nl: "Betaalbare Tweedehands Fietsen",
    },
    shortTitle: {
      en: "Second-Hand",
      nl: "Tweedehands",
    },
    excerpt: {
      en: "Fully refurbished, student-friendly bikes starting from €120.",
      nl: "Volledig gereviseerde, studentvriendelijke fietsen vanaf €120.",
    },
    metaTitle: {
      en: "Second Hand Bikes Groningen | Fixed & Student-Ready",
      nl: "Tweedehands Fietsen Groningen | Rijklaar & Goedkoop",
    },
    metaDescription: {
      en: "Looking for a cheap bike in Groningen? Our second-hand bikes are fully fixed and safety-checked. Typical prices: €70-€200.",
      nl: "Op zoek naar een goedkope fiets in Groningen? Onze tweedehands fietsen zijn nagekeken en veilig. Prijzen doorgaans tussen €70-€200.",
    },
    intro: {
      en: "In a cycling city like Groningen, you need a bike that is reliable but affordable. Our second-hand collection focuses on 'fixed' bikes—refurbished classics typically priced between €70 and €200.",
      nl: "In een fietsstad als Groningen heb je een fiets nodig die betrouwbaar én betaalbaar is. Onze tweedehands collectie biedt rijklaar gemaakte klassiekers, doorgaans geprijsd tussen €70 en €200.",
    },
    paragraphs: {
      en: [
        "Every bike in our second-hand range has been professionally serviced. While many models are ready for immediate pickup, we typically aim for a 1-day turnaround if final adjustments are needed, which may extend to 2-3 days during peak student seasons.",
        "These bikes are specifically selected for student budgets. We understand that you need something sturdy for the Vismarkt or the Zernike campus without spending a fortune.",
        "By choosing a refurbished bike, you are also making a sustainable choice, giving a high-quality frame a second life in the streets of Groningen.",
      ],
      nl: [
        "Elke fiets in ons tweedehands assortiment is professioneel onderhouden. Hoewel veel modellen direct beschikbaar zijn, streven we naar een levertijd van 1 dag voor laatste afstellingen, wat kan oplopen naar 2-3 dagen tijdens de drukke introductieweken.",
        "Deze fietsen zijn specifiek geselecteerd voor studentenbudgetten. We begrijpen dat je iets stevigs nodig hebt voor de Vismarkt of Zernike, zonder een fortuin uit te geven.",
        "Door te kiezen voor een gereviseerde fiets maak je ook een duurzame keuze; je geeft een kwaliteitsframe een tweede leven in de straten van Groningen.",
      ],
    },
  },

  {
    slug: "bike-repair",
    city: "Groningen",
    imageUrl: "/images/bike-repair.jpg",
    title: {
      en: "Expert Bike Repair Services",
      nl: "Deskundige Fietsreparatie",
    },
    shortTitle: {
      en: "Repair",
      nl: "Reparatie",
    },
    excerpt: {
      en: "Fast repairs usually ready within 24 hours. Small fixes from €15.",
      nl: "Snelle reparaties doorgaans binnen 24 uur klaar. Kleine fix vanaf €15.",
    },
    metaTitle: {
      en: "Professional Bike Repair Groningen | All Models",
      nl: "Professionele Fietsreparatie Groningen | Alle Modellen",
    },
    metaDescription: {
      en: "Reliable bike repair in Groningen. Small repairs from €15. Aiming for same-day service, 3-5 days in busy periods.",
      nl: "Betrouwbare fietsreparatie in Groningen. Kleine reparaties vanaf €15. Streven naar dezelfde dag klaar, 3-5 dagen bij drukte.",
    },
    intro: {
      en: "Don't let a broken chain or a flat tire ruin your day. Small repairs typically start around €15-€25, and we aim to have your bike back on the road within 1 business day.",
      nl: "Laat een gebroken ketting of lekke band je dag niet verpesten. Kleine reparaties beginnen doorgaans rond de €15-€25, en we streven ernaar je fiets binnen 1 werkdag klaar te hebben.",
    },
    paragraphs: {
      en: [
        "Whether you have an old 'omafiets' or a modern e-bike, we provide honest advice. For morning drop-offs, we often achieve same-day repair, though this can extend to 3-5 days during busier seasonal peaks.",
        "We believe in transparent pricing. If a repair isn't worth the cost compared to the bike's value, we'll tell you upfront. We focus on durable fixes that keep you safe on the road.",
        "Our repair service uses high-quality spare parts to ensure your bike stays 'Groningen-proof' for a long time.",
      ],
      nl: [
        "Of je nu een oude omafiets hebt of een moderne e-bike, wij geven eerlijk advies. Bij inlevering in de ochtend is de reparatie vaak dezelfde dag klaar, maar dit kan uitlopen naar 3-5 dagen in drukkere periodes.",
        "Wij geloven in transparante prijzen. Als een reparatie de kosten niet waard is, vertellen we dat eerlijk. We richten ons op duurzame oplossingen voor jouw veiligheid.",
        "Onze reparatieservice gebruikt onderdelen van hoge kwaliteit om te zorgen dat je fiets langdurig 'Groningen-proof' blijft.",
      ],
    },
  },

  {
    slug: "new-bikes",
    city: "Groningen",
    imageUrl: "/images/new-bikes.jpg",
    title: {
      en: "Premium New Bikes",
      nl: "Nieuwe Fietsen",
    },
    shortTitle: {
      en: "New Bikes",
      nl: "Nieuwe Fietsen",
    },
    excerpt: {
      en: "Quality city bikes starting from €450. Ready in 1-2 days.",
      nl: "Kwaliteitsstadsfietsen vanaf €450. Rijklaar in 1-2 dagen.",
    },
    metaTitle: {
      en: "New Bikes Groningen | Quality & Warranty",
      nl: "Nieuwe Fietsen Groningen | Kwaliteit & Garantie",
    },
    metaDescription: {
      en: "Latest city bike models in Groningen starting from €450. Professional assembly usually takes 1-2 business days.",
      nl: "Nieuwste stadsfietsen in Groningen vanaf €450. Professionele montage duurt doorgaans 1-2 werkdagen.",
    },
    intro: {
      en: "Our new bike range starts from approximately €450 for reliable city models. To ensure your safety, we typically require 1-2 days to perform a professional zero-service check and height adjustment.",
      nl: "Ons aanbod nieuwe fietsen begint rond de €450 voor betrouwbare stadsmodellen. Voor je veiligheid hebben we doorgaans 1-2 dagen nodig voor een nulbeurt en afstelling op maat.",
    },
    paragraphs: {
      en: [
        "A new bike is an investment in comfort. With modern lightweight frames, your daily commute through Groningen becomes effortless. Delivery of specific models usually takes 3-5 business days if not in local stock.",
        "We offer a curated selection of brands known for their durability in the Dutch climate. Whether it's rain or wind, these bikes are built to endure.",
        "Buying new means peace of mind. All our new bikes come with a comprehensive manufacturer warranty and a first check-up service included.",
      ],
      nl: [
        "Een nieuwe fiets is een investering in comfort. Met moderne lichtgewicht frames wordt je dagelijkse rit door Groningen moeiteloos. Levering van specifieke modellen duurt doorgaans 3-5 werkdagen indien niet op voorraad.",
        "Wij bieden een selectie merken die bekend staan om hun duurzaamheid in het Nederlandse klimaat. Regen of wind, deze fietsen zijn gebouwd om te blijven gaan.",
        "Nieuw kopen betekent gemoedsrust. Al onze nieuwe fietsen worden geleverd met fabrieksgarantie en een eerste onderhoudsbeurt inclusief.",
      ],
    },
  },

  {
    slug: "bike-accessories",
    city: "Groningen",
    imageUrl: "/images/accessories.jpg",
    title: {
      en: "Essential Bike Accessories",
      nl: "Essentiële Fietsaccessoires",
    },
    shortTitle: {
      en: "Accessories",
      nl: "Accessoires",
    },
    excerpt: {
      en: "ART-approved locks and LED lights from €15. Immediate pickup.",
      nl: "ART-gekeurde sloten en LED-verlichting vanaf €15. Direct leverbaar.",
    },
    metaTitle: {
      en: "Bike Accessories Groningen | Locks, Lights & Seats",
      nl: "Fietsaccessoires Groningen | Sloten, Licht & Zadels",
    },
    metaDescription: {
      en: "Upgrade your bike in Groningen. High-quality locks and lights typically €15-€80. Available for immediate pickup.",
      nl: "Upgrade je fiets in Groningen. Sloten en lichten doorgaans €15-€80. Direct af te halen in de winkel.",
    },
    intro: {
      en: "The right accessories range from €10 for basics to €90 for high-security locks. Most items are available for immediate pickup or same-day installation.",
      nl: "De juiste accessoires variëren van €10 voor de basis tot €90 voor zware sloten. De meeste artikelen zijn direct leverbaar of dezelfde dag gemonteerd.",
    },
    paragraphs: {
      en: [
        "Security is priority #1 in Groningen. We offer heavy-duty ART-rated locks typically ranging from €40 to €80 to keep the bike thieves at bay. Most can be fitted to your bike while you wait.",
        "Comfort matters for those long rides to the university. Test our selection of comfortable seats. Installation is usually done within minutes in our shop.",
        "Safety is non-negotiable. Stay visible during the dark Dutch winters with our LED lights (sets starting around €15) that won't fail when you need them most.",
      ],
      nl: [
        "Beveiliging is prioriteit #1 in Groningen. Wij bieden zware ART-gecertificeerde sloten aan (doorgaans €40-€80) om diefstal te voorkomen. Montage kan meestal terwijl je wacht.",
        "Comfort is belangrijk voor die lange ritten naar de uni. Test onze selectie zadels. Montage gebeurt doorgaans binnen enkele minuten in de winkel.",
        "Veiligheid is essentieel. Blijf zichtbaar tijdens de donkere Nederlandse winters met onze LED-verlichting (sets vanaf ca. €15).",
      ],
    },
  },
  {
    slug: "student-bikes",
    city: "Groningen",
    imageUrl: "/images/student-bikes-groningen.jpg",
    title: {
      en: "Sturdy Student Bikes",
      nl: "Stevige Studentenfietsen",
    },
    shortTitle: {
      en: "Student Bikes",
      nl: "Studentenfietsen",
    },
    excerpt: {
      en: "Groningen-proof bikes perfect for your daily rides to Zernike or the city center.",
      nl: "Groningen-proof fietsen, perfect voor je dagelijkse ritten naar Zernike of het centrum.",
    },
    metaTitle: {
      en: "Student Bikes Groningen | Reliable & Affordable",
      nl: "Studentenfiets Kopen Groningen | Betrouwbaar & Betaalbaar",
    },
    metaDescription: {
      en: "Need a student bike in Groningen? We offer sturdy omafietsen and city bikes from €120, fully checked and ready for the daily commute to RUG or Hanze.",
      nl: "Studentenfiets nodig in Groningen? Wij bieden stevige omafietsen en stadsfietsen vanaf €120, volledig nagekeken en klaar voor de rit naar RUG of Hanze.",
    },
    intro: {
      en: "Welcome to the ultimate cycling city. As a student in Groningen, a working bike isn't an option—it's a lifeline. We provide no-nonsense, reliable bikes that survive the student lifestyle.",
      nl: "Welkom in de ultieme fietsstad. Als student in Groningen is een werkende fiets geen luxe, maar een levenslijn. Wij leveren no-nonsense, betrouwbare fietsen die het studentenleven overleven.",
    },
    paragraphs: {
      en: [
        "Whether you are heading to an early lecture at the Zernike campus or cycling back from the Poelestraat at night, you need a bike that just works. Our student bikes are stripped of unnecessary fragile parts and focus on what matters: strong frames, good brakes, and working lights.",
        "A true 'Groningen student bike' is often a classic Dutch omafiets. They are incredibly durable, require very little maintenance, and are comfortable to ride. We fully service every bike before it leaves the shop, so you won't have to worry about immediate repairs.",
        "We know the student budget is tight. That's why we keep our prices fair and transparent. Combine your bike with one of our heavy-duty ART-approved locks, and you are fully set for your time in the city.",
      ],
      nl: [
        "Of je nu naar een vroeg college op de Zernike campus fietst of 's nachts terugkomt uit de Poelestraat, je hebt een fiets nodig die het gewoon doet. Onze studentenfietsen zijn ontdaan van kwetsbare extra's en focussen op de kern: een sterk frame, goede remmen en werkende verlichting.",
        "De ultieme 'Groningse studentenfiets' is vaak een klassieke omafiets. Ze zijn onverwoestbaar, vergen weinig onderhoud en fietsen heerlijk. We kijken elke fiets volledig na voor verkoop, zodat je je geen zorgen hoeft te maken over snelle reparaties.",
        "We weten dat een studentenbudget beperkt is. Daarom houden we onze prijzen eerlijk en transparant. Combineer je fiets met een van onze zware ART-goedgekeurde kettingsloten en je bent helemaal klaar voor je studententijd.",
      ],
    },
  },

  {
    slug: "cheap-bikes",
    city: "Groningen",
    imageUrl: "/images/cheap-bikes.jpg",
    title: {
      en: "Cheap & Budget Bikes",
      nl: "Goedkope Fietsen & Budget",
    },
    shortTitle: {
      en: "Cheap Bikes",
      nl: "Goedkope Fietsen",
    },
    excerpt: {
      en: "Budget-friendly options without compromising on basic safety.",
      nl: "Budgetvriendelijke opties zonder in te leveren op basisveiligheid.",
    },
    metaTitle: {
      en: "Cheap Bikes Groningen | Best Budget Options",
      nl: "Goedkope Fiets Kopen Groningen | Beste Budget Opties",
    },
    metaDescription: {
      en: "Looking for the cheapest working bikes in Groningen? Check out our budget options. Safe, functional, and strictly priced for tight budgets.",
      nl: "Op zoek naar de goedkoopste werkende fietsen in Groningen? Bekijk onze budget opties. Veilig, functioneel en scherp geprijsd voor een krap budget.",
    },
    intro: {
      en: "Sometimes you just need to get from point A to B as cheaply as possible. Our budget category offers the most affordable working bikes in Groningen.",
      nl: "Soms wil je gewoon zo goedkoop mogelijk van A naar B komen. Onze budgetcategorie biedt de meest betaalbare werkende fietsen in Groningen.",
    },
    paragraphs: {
      en: [
        "If you are looking for a 'cheap bike,' you usually want something functional without the premium price tag. Our budget bikes might have a few scratches, some superficial rust, or lack multiple gears, but they are mechanically safe.",
        "We firmly believe that cheap should not mean dangerous. Even our lowest-priced models go through a strict safety check. We ensure the frame is solid, the brakes are highly responsive, and the tires have plenty of tread left.",
        "Inventory for these highly affordable bikes moves extremely fast. If you need a cheap, reliable ride immediately, drop by our shop to see what we currently have on the floor—the best deals rarely stay unsold for more than a day.",
      ],
      nl: [
        "Als je zoekt naar een 'goedkope fiets', wil je meestal iets functioneels zonder de hoofdprijs te betalen. Onze budgetfietsen hebben misschien wat krasjes, oppervlakkige roest of geen versnellingen, maar ze zijn mechanisch volkomen veilig.",
        "Wij geloven stellig dat goedkoop niet onveilig mag betekenen. Zelfs onze laagst geprijsde modellen ondergaan een strikte veiligheidscheck. We zorgen dat het frame recht is, de remmen strak staan en de banden voldoende profiel hebben.",
        "De voorraad van deze zeer betaalbare fietsen wisselt enorm snel. Als je direct een goedkope, betrouwbare fiets nodig hebt, kom dan langs in de winkel om te zien wat er staat—de beste deals zijn vaak binnen een dag weg.",
      ],
    },
  },
];

export function getServicePageBySlug(
  slug: string,
  city: string
): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug && page.city === city);
}

export function getServicePagesByCity(city: string) {
  return servicePages.filter((page) => page.city === city);
}

export function getLocalizedServiceCta(lang: AppLanguage) {
  return lang === "nl" ? "Bekijk service" : "View service";
}