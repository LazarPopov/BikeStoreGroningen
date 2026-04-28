import type { AppLanguage } from "@/lib/config/i18n";
import {
  getDisplayBusinessName,
  isRentedSite,
} from "@/lib/config/site-config-utils";
import type { SiteConfig } from "@/types/site";

export type HomeFaqItem = {
  question: Record<AppLanguage, string>;
  answer: Record<AppLanguage, string>;
};

export function getHomeFaqs(siteConfig: SiteConfig): HomeFaqItem[] {
  const businessName = getDisplayBusinessName(siteConfig);

  if (!isRentedSite(siteConfig)) {
    return [
      {
        question: {
          en: `How does ${siteConfig.siteName} help in ${siteConfig.city}?`,
          nl: `Hoe helpt ${siteConfig.siteName} in ${siteConfig.city}?`,
        },
        answer: {
          en: `Send a request with your repair issue, bike type, budget, or daily route in ${siteConfig.city}. We use that information to route your inquiry to practical bike help.`,
          nl: `Verstuur een aanvraag met je reparatievraag, fietstype, budget of dagelijkse route in ${siteConfig.city}. Met die informatie kunnen we je aanvraag koppelen aan praktische fietshulp.`,
        },
      },
      {
        question: {
          en: "Can students and expats use the request form?",
          nl: "Kunnen studenten en expats het formulier gebruiken?",
        },
        answer: {
          en: `Yes. The form is built for students, expats, commuters, and locals who need bike repair, a used bike, student bike help, locks, lights, or cycling advice in ${siteConfig.city}.`,
          nl: `Ja. Het formulier is bedoeld voor studenten, expats, forenzen en locals die fietsreparatie, een tweedehands fiets, studentenfietshulp, sloten, verlichting of fietsadvies in ${siteConfig.city} zoeken.`,
        },
      },
      {
        question: {
          en: "What should I include in my request?",
          nl: "Wat moet ik in mijn aanvraag zetten?",
        },
        answer: {
          en: "Share the problem, preferred bike type, budget, frame size if known, and whether you need repair advice or help finding a bike.",
          nl: "Beschrijf het probleem, gewenste fietstype, budget, framemaat als je die weet, en of je reparatieadvies of hulp bij het vinden van een fiets zoekt.",
        },
      },
      {
        question: {
          en: "Can I call or visit a shop directly?",
          nl: "Kan ik direct bellen of langskomen bij een winkel?",
        },
        answer: {
          en: `Start with the request form so your bike question can be handled with the right context for ${siteConfig.city}.`,
          nl: `Begin met het aanvraagformulier, zodat je fietsvraag met de juiste context voor ${siteConfig.city} kan worden behandeld.`,
        },
      },
    ];
  }

  return [
    {
      question: {
        en: "Do you have second-hand bikes in stock right now?",
        nl: "Hebben jullie momenteel tweedehands fietsen op voorraad?",
      },
      answer: {
        en: `${businessName} usually has refurbished second-hand bikes available. Call or visit the shop in ${siteConfig.city} for current options.`,
        nl: `${businessName} heeft meestal gereviseerde tweedehands fietsen beschikbaar. Bel of bezoek de winkel in ${siteConfig.city} voor de actuele opties.`,
      },
    },
    {
      question: {
        en: "Do you help students and expats?",
        nl: "Helpen jullie studenten en expats?",
      },
      answer: {
        en: `Yes. ${businessName} helps students, expats, commuters, and locals in ${siteConfig.city} with practical used bikes, repair advice, locks, and lights.`,
        nl: `Ja. ${businessName} helpt studenten, expats, forenzen en locals in ${siteConfig.city} met praktische tweedehands fietsen, reparatieadvies, sloten en verlichting.`,
      },
    },
    {
      question: {
        en: "Can I bring my bike in for a quick repair?",
        nl: "Kan ik mijn fiets langsbrengen voor een snelle reparatie?",
      },
      answer: {
        en: "Yes. The shop handles common repairs such as flat tires, brakes, chains, lights, locks, wheels, and everyday maintenance.",
        nl: "Ja. De winkel helpt met veelvoorkomende reparaties zoals lekke banden, remmen, kettingen, verlichting, sloten, wielen en dagelijks onderhoud.",
      },
    },
    {
      question: {
        en: "Can you help me find a specific bike or frame size?",
        nl: "Kunnen jullie helpen met een specifiek type fiets of framemaat?",
      },
      answer: {
        en: "Yes. Share the bike type, size, budget, and use case so the shop can advise on a practical option for daily city cycling.",
        nl: "Ja. Geef het fietstype, de maat, het budget en je gebruik door, zodat de winkel kan adviseren over een praktische optie voor dagelijks stadsgebruik.",
      },
    },
  ];
}
