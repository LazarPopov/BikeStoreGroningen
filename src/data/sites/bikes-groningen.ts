import type { SiteConfig } from "@/types/site";

export const bikesGroningenConfig: SiteConfig = {
  // --- Analytics & Tracking IDs ---
  gaId: "G-K5HCM0GG8R",
  gtmId: "GTM-5LT2R5JP",
  ahrefsKey: "qhUiB1JoYJ0hmmWO2wxjoQ",

  // --- Core Site Details ---
  siteKey: "bikes-groningen",
  siteName: "BikeStoreGroningen.nl",
  domain: "bikesgroningen.nl",
  city: "Groningen",
  country: "Netherlands",

  phoneNumber: "+31 50 880 0406",
  email: "detweewielen@hotmail.com",
  address: "Paterswoldseweg 30",
  postalCode: "9726 BD",

  openingHours: [
    { day: "Monday", open: "13:00", close: "18:00" },
    { day: "Tuesday", open: "09:00", close: "18:00" },
    { day: "Wednesday", open: "09:00", close: "18:00" },
    { day: "Thursday", open: "09:00", close: "18:00" },
    { day: "Friday", open: "09:00", close: "18:00" },
    { day: "Saturday", open: "10:00", close: "17:00" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ],

  // --- Integrations & Maps ---
  googleBusinessUrl:
    "https://www.google.com/maps/place/The+two+wheels/@53.2122962,6.5532358,17z/data=!3m1!4b1!4m6!3m5!1s0x47c9cd4cee974487:0x2c076c431da266a8!8m2!3d53.212293!4d6.5558161!16s%2Fg%2F1th7xltm?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
  googleBusinessProfileName: "De Twee Wielen",
  googleReviewRating: 4.2,
  googleReviewCount: 102,
  mapEmbedUrl:
    "https://www.google.com/maps?q=Paterswoldseweg+30,+9726+BD+Groningen&output=embed",

  latitude: 53.208,
  longitude: 6.551,

  // --- Content ---
  heroTitle: {
    en: "Bike Repair & Bike Shop in Groningen",
    nl: "Fietsenmaker en fietsenwinkel in Groningen",
  },

  heroSubtitle: {
    en: "Call or visit De Twee Wielen on Paterswoldseweg for bike repair, second-hand bikes, student bikes, new bikes, and practical cycling help in Groningen.",
    nl: "Bel of bezoek De Twee Wielen aan de Paterswoldseweg voor fietsreparatie, tweedehands fietsen, studentenfietsen, nieuwe fietsen en praktische fietshulp in Groningen.",
  },

  callToActionText: {
    en: "Call for bike repair",
    nl: "Bel voor fietsreparatie",
  },

  contactPersonName: "De Twee Wielen",

  neighborhoods: [
    "Vinkhuizen",
    "Helpman",
    "Korrewegwijk",
    "Centrum",
    "Selwerd",
    "Paddepoel",
    "Oosterpoort",
    "Beijum",
    "Oosterparkwijk",
  ],

  whatsappNumber: "+31644910369",
  whatsappPrefilledMessage: {
    en: "Hi, I am interested in bike options in Groningen.",
    nl: "Hoi, ik ben geinteresseerd in fietsopties in Groningen.",
  },

  // --- SEO ---
  seoDefaults: {
    en: {
      metaTitle: "Bike Repair Groningen | De Twee Wielen Bike Shop",
      metaDescription:
        "Need a bike repair shop in Groningen? Call or visit De Twee Wielen for repairs, student bikes, second-hand bikes, locks, lights, and expat-friendly cycling help.",
      ogTitle: "Bike Repair & Bike Shop Groningen | De Twee Wielen",
      ogDescription:
        "Fast bike repairs, reliable bikes, student bikes, and practical cycling help from De Twee Wielen in Groningen.",
    },
    nl: {
      metaTitle: "Fietsenmaker Groningen | De Twee Wielen",
      metaDescription:
        "Fietsenmaker in Groningen voor reparatie, studentenfietsen, tweedehands fietsen, sloten, verlichting en praktische hulp voor studenten en expats.",
      ogTitle: "Fietsenmaker & fietsenwinkel Groningen | De Twee Wielen",
      ogDescription:
        "Snelle fietsreparaties, betrouwbare fietsen, studentenfietsen en praktische fietshulp van De Twee Wielen in Groningen.",
    },
  },

  // --- Reviews ---
  reviews: [
    {
      reviewerName: "J S",
      rating: 5,
      reviewText:
        "Today went to de twee wielen for a second hand bike. Very good service and a good price. Even got a student discount. Thank you a lot for the help and service.",
      source: "Google",
    },
    {
      reviewerName: "Jochem Van Gestel",
      rating: 5,
      reviewText:
        "Proper service and repairs for a good price. Owner is friendly and works extremely quick. If your bike needs fixing I definitely recommend this shop.",
      source: "Google",
    },
    {
      reviewerName: "MrChawdry",
      rating: 5,
      reviewText:
        "I went here when I had just started studying in Groningen because it is near the station. They have lots of diverse second hand bikes. They even told me they can buy the bike back when I am done with my studies. Highly recommend The Twee Wielen.",
      source: "Google",
    },
  ],
};
