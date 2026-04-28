import { createGenericLocalAreaPages } from "@/data/neighborhood-pages";
import type { SiteConfig } from "@/types/site";

const city = "Rotterdam";

export const bikesRotterdamConfig: SiteConfig = {
  siteKey: "bikes-rotterdam",
  rentalMode: "lead-capture",
  siteName: "BikeStoreRotterdam.nl",
  domain: "bikestorerotterdam.nl",
  city,
  country: "Netherlands",
  leadEmail: "leads@bikestorerotterdam.nl",
  heroImagePath: "/images/bike-repair.jpg",

  heroTitle: {
    en: "Bike Repair & Bike Shop Help in Rotterdam",
    nl: "Fietsenmaker en fietsenwinkel hulp in Rotterdam",
  },
  heroSubtitle: {
    en: "Request help with bike repair, second-hand bikes, student bikes, locks, lights, and practical cycling questions in Rotterdam.",
    nl: "Vraag hulp aan voor fietsreparatie, tweedehands fietsen, studentenfietsen, sloten, verlichting en praktische fietsvragen in Rotterdam.",
  },
  callToActionText: {
    en: "Request bike help",
    nl: "Vraag fietshulp aan",
  },

  neighborhoods: [
    "Centrum",
    "Kralingen",
    "Delfshaven",
    "Noord",
    "Zuid",
    "Blijdorp",
  ],
  localAreas: createGenericLocalAreaPages(city, [
    { slug: "centrum", name: "Rotterdam Centrum" },
    { slug: "kralingen", name: "Kralingen" },
    { slug: "delfshaven", name: "Delfshaven" },
    { slug: "rotterdam-noord", name: "Rotterdam Noord" },
    { slug: "rotterdam-centraal", name: "Rotterdam Centraal", pageType: "landmark" },
    { slug: "erasmus-university", name: "Erasmus University", pageType: "landmark" },
  ]),

  whatsappNumber: "",
  whatsappPrefilledMessage: {
    en: "Hi, I need bike help in Rotterdam.",
    nl: "Hoi, ik heb fietshulp nodig in Rotterdam.",
  },

  seoDefaults: {
    en: {
      metaTitle: "Bike Repair Rotterdam | BikeStoreRotterdam.nl",
      metaDescription:
        "Need bike repair, a student bike, or second-hand bike help in Rotterdam? Send a request through BikeStoreRotterdam.nl.",
      ogTitle: "Bike Repair & Bike Shop Help in Rotterdam",
      ogDescription:
        "Request Rotterdam bike help for repairs, student bikes, second-hand bikes, locks, lights, and everyday cycling questions.",
    },
    nl: {
      metaTitle: "Fietsenmaker Rotterdam | BikeStoreRotterdam.nl",
      metaDescription:
        "Fietsreparatie, een studentenfiets of tweedehands fiets nodig in Rotterdam? Verstuur je aanvraag via BikeStoreRotterdam.nl.",
      ogTitle: "Fietsenmaker en fietsenwinkel hulp in Rotterdam",
      ogDescription:
        "Vraag fietshulp aan in Rotterdam voor reparatie, studentenfietsen, tweedehands fietsen, sloten, verlichting en dagelijkse fietsvragen.",
    },
  },
};
