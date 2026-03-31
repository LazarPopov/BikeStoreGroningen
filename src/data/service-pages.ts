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