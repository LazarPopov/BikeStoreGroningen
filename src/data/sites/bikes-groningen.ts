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
  googleBusinessUrl: "https://www.google.com/maps/place/The+two+wheels/@53.2122962,6.5532358,17z/data=!3m1!4b1!4m6!3m5!1s0x47c9cd4cee974487:0x2c076c431da266a8!8m2!3d53.212293!4d6.5558161!16s%2Fg%2F1th7xltm?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
  googleBusinessProfileName: "De Twee Wielen",
  googleReviewRating: 4.2,
  googleReviewCount: 102,
  mapEmbedUrl: "https://www.google.com/maps?q=Paterswoldseweg+30,+9726+BD+Groningen&output=embed",

  latitude: 53.208,
  longitude: 6.551,

  // --- Content ---
  heroTitle: {
    en: "Bikes in Groningen from De Twee wielen",
    nl: "Fietsen in Groningen van De Twee wielen",
  },

  heroSubtitle: {
    en: "Find bikes, repairs, and local bike help in Groningen through our current bike partner De Twee wielen.",
    nl: "Vind fietsen, reparaties en lokale fietshulp in Groningen via onze huidige fietspartner De Twee wielen.",
  },

  callToActionText: {
    en: "Call De Twee Wielen",
    nl: "Bel De Twee Wielen",
  },

  contactPersonName: "De Twee Wielen",

  neighborhoods: ["Vinkhuizen", "Helpman", "Korrewegwijk"],

  whatsappNumber: "+31644910369",
  whatsappPrefilledMessage: {
    en: "Hi, I am interested in bike options in Groningen.",
    nl: "Hoi, ik ben geïnteresseerd in fietsopties in Groningen.",
  },

  // --- SEO ---
  seoDefaults: {
    en: {
      metaTitle: "Bikes Groningen | Professional Repair & Quality Sales | De Twee Wielen",
      metaDescription:
        "Your trusted local partner for fast bike repairs, affordable second-hand bikes, and premium accessories in Groningen. Visit De Twee Wielen today.",
      ogTitle: "Bikes & Repair Groningen | De Twee Wielen",
      ogDescription:
        "Expert bike services in the heart of Groningen. From flat tires to new e-bikes, De Twee Wielen keeps you cycling safely.",
    },
    nl: {
      metaTitle: "Fietsen Groningen | Snelle Reparatie & Kwaliteitsfietsen | De Twee Wielen",
      metaDescription:
        "Uw betrouwbare lokale partner voor snelle fietsreparaties, betaalbare tweedehands fietsen en premium accessoires in Groningen. Bezoek De Twee Wielen.",
      ogTitle: "Fietsen & Reparatie Groningen | De Twee Wielen",
      ogDescription:
        "Vakkundige fietsservice in het hart van Groningen. Van een lekke band tot nieuwe e-bikes, De Twee Wielen helpt u veilig op weg.",
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