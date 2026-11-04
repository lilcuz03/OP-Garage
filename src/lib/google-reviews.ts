import { cacheLife } from "next/cache";
import {
  MAPS_URL,
  staticReviews,
  staticSummary,
  type Review,
  type ReviewsData,
} from "@/data/Reviews";

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name?: string;
    relativePublishTimeDescription?: string;
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
};

/* Cached for about an hour, so Google is not called on every visit */
export async function getReviews(): Promise<ReviewsData> {
  "use cache";
  cacheLife("hours");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const fallback: ReviewsData = {
    rating: staticSummary.rating,
    total: staticSummary.total,
    reviews: staticReviews,
    mapsUrl: MAPS_URL,
    writeUrl: placeId
      ? `https://search.google.com/local/writereview?placeid=${placeId}`
      : MAPS_URL,
  };

  /* No keys yet: show the static reviews */
  if (!key || !placeId) return fallback;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
      },
    );
    if (!res.ok) return fallback;

    const data = (await res.json()) as PlacesResponse;

    const reviews: Review[] = (data.reviews ?? [])
      .map((r, i) => ({
        id: r.name ?? String(i),
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        when: r.relativePublishTimeDescription ?? "",
        source: "google" as const,
      }))
      .filter((r) => r.text.trim().length > 0);

    if (reviews.length === 0) return fallback;

    return {
      rating: data.rating ?? fallback.rating,
      total: data.userRatingCount ?? fallback.total,
      reviews,
      mapsUrl: data.googleMapsUri ?? MAPS_URL,
      writeUrl: fallback.writeUrl,
    };
  } catch {
    return fallback;
  }
}
