export const MAPS_URL = "https://maps.app.goo.gl/CLWjHakPe8jSWuB57";

export type Review = {
  id: string;
  author: string;
  authorUrl?: string;
  rating: number;
  text: string;
  when?: string;
  job?: string;
  source?: "google" | "website";
};

export type ReviewsData = {
  rating: number | null;
  total: number | null;
  reviews: Review[];
  mapsUrl: string;
  writeUrl: string;
};

/* Taken from the current site. Confirm with the owner that these are real
   customers before publishing. Replaced by live Google reviews once the
   API keys are added. */
export const staticReviews: Review[] = [
  {
    id: "andrew-elliott",
    author: "Andrew D. Elliott",
    rating: 4.5,
    job: "Broken gate motor",
    source: "website",
    text: "I was truly impressed with the excellent response time and the exceptional quality of service delivery. My experience has been nothing short of outstanding, and I wholeheartedly recommend their services to anyone seeking reliability and responsiveness.",
  },
  {
    id: "lisa-packer",
    author: "Lisa C. Packer",
    rating: 5,
    job: "Faulty garage door",
    source: "website",
    text: "I am absolutely thrilled with the service I received for my garage door! The team worked efficiently and managed to fix the issue quickly, surpassing my expectations. I couldn't be more impressed with their professionalism and expertise!",
  },
  {
    id: "tanya-johnson",
    author: "Tanya Johnson",
    rating: 4,
    job: "Carport for car shade",
    source: "website",
    text: "They constructed a carport for me in what felt like no time at all. This impressive turnaround has relieved me of the constant worry about the sun potentially damaging my car's paint. Now, I can enjoy peace of mind knowing that my vehicle is protected from harsh sunlight and other environmental factors.",
  },
];

/* Overall rating shown in the header. Leave both null until real Google numbers exist. */
export const staticSummary: { rating: number | null; total: number | null } = {
  rating: null,
  total: null,
};
