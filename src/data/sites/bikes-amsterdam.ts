import { createGenericLocalAreaPages } from "@/data/neighborhood-pages";
import type { SiteConfig } from "@/types/site";

const city = "Amsterdam";

export const bikesAmsterdamConfig: SiteConfig = {
  siteKey: "bikes-amsterdam",
  rentalMode: "lead-capture",
  siteName: "BikeStoreAmsterdam.nl",
  domain: "bikestoreamsterdam.nl",
  city,
  country: "Netherlands",
  leadEmail: "leads@bikestoreamsterdam.nl",
  heroImagePath: "/images/bike-repair.jpg",

  heroTitle: {
    en: "Bike Repair & Bike Shop Help in Amsterdam",
    nl: "Fietsenmaker en fietsenwinkel hulp in Amsterdam",
  },
  heroSubtitle: {
    en: "Request help with bike repair, second-hand bikes, student bikes, locks, lights, and practical cycling questions in Amsterdam.",
    nl: "Vraag hulp aan voor fietsreparatie, tweedehands fietsen, studentenfietsen, sloten, verlichting en praktische fietsvragen in Amsterdam.",
  },
  callToActionText: {
    en: "Request bike help",
    nl: "Vraag fietshulp aan",
  },

  neighborhoods: [
    "Centrum",
    "De Pijp",
    "Oud-West",
    "Amsterdam Noord",
    "Oost",
    "Zuid",
  ],
  localAreas: createGenericLocalAreaPages(city, [
    { slug: "centrum", name: "Amsterdam Centrum" },
    { slug: "de-pijp", name: "De Pijp" },
    { slug: "oud-west", name: "Oud-West" },
    { slug: "amsterdam-noord", name: "Amsterdam Noord" },
    { slug: "amsterdam-centraal", name: "Amsterdam Centraal", pageType: "landmark" },
    { slug: "vondelpark", name: "Vondelpark", pageType: "landmark" },
  ]),

  whatsappNumber: "",
  whatsappPrefilledMessage: {
    en: "Hi, I need bike help in Amsterdam.",
    nl: "Hoi, ik heb fietshulp nodig in Amsterdam.",
  },

  seoDefaults: {
    en: {
      metaTitle: "Bike Repair Amsterdam | BikeStoreAmsterdam.nl",
      metaDescription:
        "Need bike repair, a student bike, or second-hand bike help in Amsterdam? Send a request through BikeStoreAmsterdam.nl.",
      ogTitle: "Bike Repair & Bike Shop Help in Amsterdam",
      ogDescription:
        "Request Amsterdam bike help for repairs, student bikes, second-hand bikes, locks, lights, and everyday cycling questions.",
    },
    nl: {
      metaTitle: "Fietsenmaker Amsterdam | BikeStoreAmsterdam.nl",
      metaDescription:
        "Fietsreparatie, een studentenfiets of tweedehands fiets nodig in Amsterdam? Verstuur je aanvraag via BikeStoreAmsterdam.nl.",
      ogTitle: "Fietsenmaker en fietsenwinkel hulp in Amsterdam",
      ogDescription:
        "Vraag fietshulp aan in Amsterdam voor reparatie, studentenfietsen, tweedehands fietsen, sloten, verlichting en dagelijkse fietsvragen.",
    },
  },
};
