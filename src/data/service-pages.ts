// src/data/service-pages.ts

import type { AppLanguage } from "@/lib/config/i18n";
import type { ServicePage } from "@/types/service-page";

export const servicePages: ServicePage[] = [
  {
    slug: "second-hand-bikes",
    city: "Groningen",
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
      en: "Refurbished, student-friendly bikes for daily Groningen rides.",
      nl: "Gereviseerde, studentvriendelijke fietsen voor dagelijks gebruik in Groningen.",
    },
    metaTitle: {
      en: "Second-Hand Bikes Groningen | Students & Expats",
      nl: "Tweedehands fietsen Groningen | Studenten & expats",
    },
    metaDescription: {
      en: "Looking for a second-hand bike in Groningen? De Twee Wielen helps students and expats find practical used bikes for city, station, and campus rides.",
      nl: "Zoek je een tweedehands fiets in Groningen? De Twee Wielen helpt studenten en expats met praktische fietsen voor stad, station en campus.",
    },
    intro: {
      en: "In a cycling city like Groningen, students and expats need a bike that is reliable, easy to maintain, and ready for daily rides between home, station, campus, and the center.",
      nl: "In een fietsstad als Groningen hebben studenten en expats een fiets nodig die betrouwbaar, onderhoudsvriendelijk en klaar is voor dagelijkse ritten tussen huis, station, campus en centrum.",
    },
    paragraphs: {
      en: [
        "Every second-hand bike is prepared with daily city use in mind. We focus on the basics that matter in Groningen: dependable brakes, working lights, comfortable riding position, and practical parts.",
        "For newcomers, buying a used bike can be simpler than a monthly subscription if you want your own bicycle for the full study period or work stay. Drop by the shop for honest advice before choosing.",
        "These bikes fit common student and expat routes: Groningen Station, Zernike Campus, Hanze, RUG buildings, the city center, and residential neighborhoods around the city.",
      ],
      nl: [
        "Elke tweedehands fiets wordt voorbereid met dagelijks stadsgebruik in gedachten. We letten op de basis die in Groningen telt: betrouwbare remmen, werkende verlichting, comfortabele houding en praktische onderdelen.",
        "Voor nieuwkomers kan een gebruikte fiets eenvoudiger zijn dan een maandabonnement als je je eigen fiets wilt voor je studieperiode of verblijf in Groningen. Kom langs voor eerlijk advies.",
        "Deze fietsen passen bij typische studenten- en expatroutes: Station Groningen, Zernike Campus, Hanze, RUG-gebouwen, het centrum en woonwijken rond de stad.",
      ],
    },
  },
  {
    slug: "bike-repair",
    city: "Groningen",
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
      en: "Fast help for flat tires, brakes, chains, lights, and daily bike problems.",
      nl: "Snelle hulp bij lekke banden, remmen, kettingen, verlichting en dagelijkse fietsproblemen.",
    },
    metaTitle: {
      en: "Bike Repair Groningen | De Twee Wielen",
      nl: "Fietsenmaker Groningen | De Twee Wielen",
    },
    metaDescription: {
      en: "Reliable bike repair in Groningen for students, expats, and daily riders. Call or visit De Twee Wielen for flat tires, brakes, chains, lights, and more.",
      nl: "Betrouwbare fietsreparatie in Groningen voor studenten, expats en dagelijkse fietsers. Bel of bezoek De Twee Wielen voor banden, remmen, kettingen, verlichting en meer.",
    },
    intro: {
      en: "Do not let a broken chain, flat tire, weak brake, or dead light interrupt your commute to class, work, the station, or the city center.",
      nl: "Laat een kapotte ketting, lekke band, zwakke rem of kapot lampje je rit naar college, werk, station of centrum niet onderbreken.",
    },
    paragraphs: {
      en: [
        "Whether you ride an old omafiets, a student bike, a city bike, or an e-bike, De Twee Wielen gives practical advice before repair work starts.",
        "Students and expats often need quick clarity: can this bike be fixed, is it worth repairing, and what should be checked before riding through Groningen traffic again?",
        "The repair service focuses on durable basics: tires, brakes, chains, lights, wheels, saddles, locks, and the parts that make a bike safe for everyday Groningen use.",
      ],
      nl: [
        "Of je nu op een oude omafiets, studentenfiets, stadsfiets of e-bike rijdt, De Twee Wielen geeft praktisch advies voordat de reparatie begint.",
        "Studenten en expats willen vaak snel duidelijkheid: kan deze fiets worden gemaakt, is reparatie verstandig en wat moet gecontroleerd worden voordat je weer door Groningen rijdt?",
        "De reparatieservice focust op duurzame basiszaken: banden, remmen, kettingen, verlichting, wielen, zadels, sloten en onderdelen die je fiets veilig maken voor dagelijks gebruik.",
      ],
    },
  },
  {
    slug: "new-bikes",
    city: "Groningen",
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
      en: "Reliable new city bikes for Groningen commuting and everyday riding.",
      nl: "Betrouwbare nieuwe stadsfietsen voor woon-werkverkeer en dagelijks fietsen in Groningen.",
    },
    metaTitle: {
      en: "New Bikes Groningen | De Twee Wielen",
      nl: "Nieuwe fietsen Groningen | De Twee Wielen",
    },
    metaDescription: {
      en: "Looking for a new bike in Groningen? Visit De Twee Wielen for practical city bikes, personal advice, and professional setup.",
      nl: "Op zoek naar een nieuwe fiets in Groningen? Bezoek De Twee Wielen voor praktische stadsfietsen, persoonlijk advies en professionele afstelling.",
    },
    intro: {
      en: "A new city bike should fit the way you actually ride: daily trips through Groningen, station routes, campus routes, work commutes, and weekend errands.",
      nl: "Een nieuwe stadsfiets moet passen bij hoe je echt fietst: dagelijkse ritten door Groningen, stationroutes, campusroutes, werkritten en boodschappen.",
    },
    paragraphs: {
      en: [
        "De Twee Wielen focuses on practical city bikes that can handle Dutch weather, busy bike lanes, regular parking, and daily commuting.",
        "Visit the shop for advice on frame size, riding position, locks, lights, tires, and the small setup choices that make a new bike comfortable.",
        "If you are a student, expat, commuter, or local rider, the team can help you compare a new bike with a refurbished used bike before you decide.",
      ],
      nl: [
        "De Twee Wielen focust op praktische stadsfietsen die passen bij Nederlands weer, drukke fietspaden, dagelijks parkeren en woon-werkverkeer.",
        "Kom langs voor advies over framemaat, zithouding, sloten, verlichting, banden en de kleine afstellingen die een nieuwe fiets comfortabel maken.",
        "Ben je student, expat, forens of lokale fietser? Het team helpt je een nieuwe fiets vergelijken met een gereviseerde tweedehands fiets voordat je kiest.",
      ],
    },
  },
  {
    slug: "bike-accessories",
    city: "Groningen",
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
      en: "Locks, lights, saddles, and everyday accessories for Groningen riders.",
      nl: "Sloten, verlichting, zadels en dagelijkse accessoires voor fietsers in Groningen.",
    },
    metaTitle: {
      en: "Bike Locks & Accessories Groningen",
      nl: "Fietsaccessoires & sloten Groningen",
    },
    metaDescription: {
      en: "Protect your bike in Groningen with stronger locks, reliable lights, and practical accessories for students, expats, and daily commuters.",
      nl: "Bescherm je fiets in Groningen met sterke sloten, betrouwbare verlichting en praktische accessoires voor studenten, expats en dagelijkse fietsers.",
    },
    intro: {
      en: "In Groningen, the right accessories are not decoration. Good locks, working lights, comfortable contact points, and practical parts make daily riding easier.",
      nl: "In Groningen zijn goede accessoires geen decoratie. Sterke sloten, werkende verlichting, comfortabele contactpunten en praktische onderdelen maken dagelijks fietsen makkelijker.",
    },
    paragraphs: {
      en: [
        "Security matters in a busy cycling city. De Twee Wielen can help you choose a lock setup that suits where and how you park your bike.",
        "Visibility matters too, especially during dark Dutch winters and rainy evenings. Reliable lights are one of the simplest upgrades for student and city bikes.",
        "For longer rides to Zernike, Hanze, RUG, the station, or work, small comfort upgrades like saddles and grips can make daily cycling feel much easier.",
      ],
      nl: [
        "Beveiliging is belangrijk in een drukke fietsstad. De Twee Wielen helpt je een slotoplossing kiezen die past bij waar en hoe je je fiets parkeert.",
        "Zichtbaarheid telt ook, vooral tijdens donkere Nederlandse winters en regenachtige avonden. Betrouwbare verlichting is een simpele verbetering voor studenten- en stadsfietsen.",
        "Voor langere ritten naar Zernike, Hanze, RUG, station of werk kunnen kleine comfortverbeteringen zoals zadels en handvatten veel verschil maken.",
      ],
    },
  },
  {
    slug: "student-bikes",
    city: "Groningen",
    imageUrl: "/images/student-bikes-groningen.jpg",
    title: {
      en: "Student Bikes for Groningen",
      nl: "Studentenfietsen voor Groningen",
    },
    shortTitle: {
      en: "Student Bikes",
      nl: "Studentenfietsen",
    },
    excerpt: {
      en: "Reliable student bikes for Zernike, Hanze, RUG, station, and city rides.",
      nl: "Betrouwbare studentenfietsen voor Zernike, Hanze, RUG, station en centrum.",
    },
    metaTitle: {
      en: "Student Bikes Groningen | Used Bicycles",
      nl: "Studentenfietsen Groningen | Tweedehands fietsen",
    },
    metaDescription: {
      en: "Looking for a student bike in Groningen? De Twee Wielen helps students and expats find reliable used bikes for Zernike, Hanze, RUG, and city rides.",
      nl: "Studentenfiets nodig in Groningen? De Twee Wielen helpt studenten en expats met betrouwbare tweedehands fietsen voor Zernike, Hanze, RUG en centrum.",
    },
    intro: {
      en: "Welcome to Groningen, a city where a working student bike is not optional. De Twee Wielen helps students and expats choose practical bikes for daily routes.",
      nl: "Welkom in Groningen, een stad waar een werkende studentenfiets geen luxe is. De Twee Wielen helpt studenten en expats met praktische fietsen voor dagelijkse routes.",
    },
    paragraphs: {
      en: [
        "Whether you are heading to an early lecture at Zernike Campus, Hanze, or RUG, or cycling back from the Poelestraat at night, you need a bike that just works.",
        "A true Groningen student bike is often simple: a strong frame, good brakes, working lights, a comfortable position, and parts that can survive daily use.",
        "If you are comparing subscription bikes such as Swapfiets with owning a reliable used bicycle, visit the shop for practical advice before deciding.",
      ],
      nl: [
        "Of je nu naar een vroeg college op Zernike Campus, Hanze of RUG fietst, of 's nachts terugkomt uit de Poelestraat, je hebt een fiets nodig die het gewoon doet.",
        "Een echte Groningse studentenfiets is vaak simpel: een sterk frame, goede remmen, werkende verlichting, een comfortabele houding en onderdelen die dagelijks gebruik aankunnen.",
        "Vergelijk je een fietsabonnement zoals Swapfiets met een eigen betrouwbare tweedehands fiets? Kom langs voor praktisch advies voordat je kiest.",
      ],
    },
  },
  {
    slug: "cheap-bikes",
    city: "Groningen",
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
      en: "Cheap Bikes Groningen | Students & Expats",
      nl: "Goedkope fietsen Groningen | Studenten & expats",
    },
    metaDescription: {
      en: "Need a cheap bike in Groningen? De Twee Wielen helps students, expats, and newcomers find practical budget bikes for daily city rides.",
      nl: "Goedkope fiets nodig in Groningen? De Twee Wielen helpt studenten, expats en nieuwkomers met praktische budgetfietsen voor dagelijks stadsgebruik.",
    },
    intro: {
      en: "Sometimes you simply need a practical bike for lectures, work, groceries, and station trips. De Twee Wielen helps you find a budget option that still makes sense for Groningen traffic.",
      nl: "Soms heb je gewoon een praktische fiets nodig voor college, werk, boodschappen en ritten naar het station. De Twee Wielen helpt je met een budgetoptie die past bij fietsen in Groningen.",
    },
    paragraphs: {
      en: [
        "When you need a cheap bike in Groningen, you usually want something functional: a solid frame, responsive brakes, working lights, and a lock setup that fits daily city use.",
        "International students and expats who have just arrived often need a bike before they fully understand the local cycling routine.",
        "Cheap should still be practical. Visit the shop for advice on whether a budget bike, student bike, or more durable second-hand model makes the most sense for your route.",
      ],
      nl: [
        "Als je zoekt naar een goedkope fiets in Groningen, wil je meestal iets functioneels: een stevig frame, goede remmen, werkende verlichting en een slotoplossing die past bij dagelijks stadsgebruik.",
        "Deze pagina is extra nuttig voor internationale studenten en expats die net zijn aangekomen en snel een fiets nodig hebben voordat ze de lokale fietsroutine kennen.",
        "Goedkoop moet nog steeds praktisch zijn. Kom langs voor advies over de keuze tussen een budgetfiets, studentenfiets of duurzamer tweedehands model voor jouw route.",
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
