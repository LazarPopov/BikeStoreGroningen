import type { AppLanguage } from "@/lib/config/i18n";

export type HomeFaqItem = {
  question: Record<AppLanguage, string>;
  answer: Record<AppLanguage, string>;
};

export const homeFaqs: HomeFaqItem[] = [
  {
    question: {
      en: "Do you have second-hand bikes in stock right now?",
      nl: "Hebben jullie momenteel tweedehands fietsen op voorraad?",
    },
    answer: {
      en: "Yes! We always have a wide range of refurbished second-hand bikes. Every bike is fully checked and serviced by our mechanics before being sold.",
      nl: "Zeker! We hebben altijd een ruim assortiment aan gereviseerde tweedehands fietsen. Elke fiets wordt volledig nagekeken door onze monteurs voordat deze de winkel verlaat.",
    },
  },
  {
    question: {
      en: "Do you offer special bike deals for students and expats?",
      nl: "Bieden jullie speciale fietsendeals voor studenten en expats?",
    },
    answer: {
      en: "Absolutely. We specialize in affordable, reliable bikes perfect for student life and expats in Groningen. We can help you find a sturdy bike that fits your budget.",
      nl: "Absoluut. Wij zijn gespecialiseerd in betaalbare, betrouwbare fietsen die perfect zijn voor het studentenleven en expats in Groningen. We helpen je graag aan een stevige fiets die binnen je budget past.",
    },
  },  
  {
    question: {
      en: "Can I bring my bike in for a quick repair?",
      nl: "Kan ik mijn fiets langsbrengen voor een snelle reparatie?",
    },
    answer: {
      en: "Yes, we handle all types of repairs, from flat tires to full maintenance. Usually, if you bring your bike in the morning, we can have it ready for you the same day.",
      nl: "Ja, we doen alle soorten reparaties, van een lekke band tot een volledige onderhoudsbeurt. Meestal geldt: 's ochtends brengen, 's middags weer op pad.",
    },
  },
  {
    question: {
      en: "Do I get a warranty on a second-hand bike?",
      nl: "Krijg ik garantie op een tweedehands fiets?",
    },
    answer: {
      en: "Quality and trust are important to us. All our refurbished second-hand bikes come with a standard warranty so you can cycle through Groningen with peace of mind.",
      nl: "Kwaliteit en vertrouwen staan bij ons voorop. Al onze gereviseerde tweedehands fietsen worden geleverd met een standaard garantie, zodat je met een gerust hart door Groningen kunt fietsen.",
    },
  },
  {
    question: {
      en: "Can you help me find a specific type of bike or frame size?",
      nl: "Kunnen jullie mij helpen aan een specifiek type fiets of framemaat?",
    },
    answer: {
      en: "Yes! If you are looking for a specific brand, size, or style (like an omafiets or a racing bike), just let us know. We receive new stock daily and can match you with the perfect fit.",
      nl: "Ja! Als je op zoek bent naar een specifiek merk, maat of stijl (zoals een omafiets of een racefiets), laat het ons weten. We krijgen dagelijks nieuwe voorraad binnen en helpen je graag aan de perfecte match.",
    },
  },
];