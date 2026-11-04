export type FaqCategory =
  | "Services"
  | "Quotes & appointments"
  | "Repairs & warranty";

export type Faq = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export const faqCategories: {
  id: string;
  name: FaqCategory;
  blurb: string;
}[] = [
  {
    id: "services",
    name: "Services",
    blurb: "What we install and repair.",
  },
  {
    id: "quotes",
    name: "Quotes & appointments",
    blurb: "How to reach us and what happens next.",
  },
  {
    id: "repairs",
    name: "Repairs & warranty",
    blurb: "Emergencies and the work we stand behind.",
  },
];

export const faqs: Faq[] = [
  {
    category: "Services",
    question: "What services do you offer?",
    answer:
      "We repair and install garage doors, gate motors, electric fences, burglar guards, clearview fencing and carports. We also do much more, so if you can't see what you need, just ask.",
  },
  {
    category: "Quotes & appointments",
    question: "How do I get a quote?",
    answer:
      "Message us on WhatsApp or give us a call. Tell us what the problem is or what you'd like installed, and we'll take it from there.",
  },
  {
    category: "Repairs & warranty",
    question: "Do you offer emergency repairs?",
    answer:
      "Yes. We offer emergency repair services and are just a call away. If something unexpected happens, contact us anytime and our team will assist you promptly.",
  },
  {
    category: "Repairs & warranty",
    question: "Is there a warranty on your work?",
    answer:
      "Yes. We offer warranties on the vast majority of our services, so you can have peace of mind that we stand behind our work. Ask us about the warranty for your specific job when you request your quote.",
  },
  {
    category: "Quotes & appointments",
    question: "Can I book an appointment that suits me?",
    answer:
      "Yes. We offer flexible appointments, and our support is available 24/7.",
  },
  {
    category: "Services",
    question: "Do you do both repairs and new installations?",
    answer:
      "Yes. Depending on the service, we handle new installations, repairs and maintenance for your garage door, gate motor, fence or carport.",
  },
  {
    category: "Services",
    question: "Do you install and service gate motors?",
    answer:
      "Yes. Our skilled technicians install and repair various gate motors, so your gate opens and closes securely and efficiently.",
  },
  {
    category: "Services",
    question: "Do you install and maintain electric fences?",
    answer:
      "Yes. We provide professional installation of electric fences, along with maintenance to keep them working as they should.",
  },
  {
    category: "Services",
    question: "What types of carports do you install?",
    answer:
      "We install a variety of carport styles, from freestanding to attached, to complement your home. We also handle carport repairs.",
  },
  {
    category: "Quotes & appointments",
    question: "How does the process work?",
    answer:
      "You tell us your problem, in person or over the phone. We then inspect the problem on-site, and get it fixed.",
  },
  {
    category: "Quotes & appointments",
    question: "Is support really available 24/7?",
    answer:
      "Yes. Our support and sales team is available 24/7 to answer your queries, so message us on WhatsApp or call whenever you need us.",
  },
  {
    /* Confirm with the owner and list suburbs if they want to */
    category: "Quotes & appointments",
    question: "Which areas do you cover?",
    answer:
      "We're based in Durban, KwaZulu-Natal. Send us your suburb on WhatsApp and we'll confirm we can get to you.",
  },
];
