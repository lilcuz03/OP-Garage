import ReviewsView from "@/components/sections/ReviewsView";
import { getReviews } from "@/lib/google-reviews";

export default async function Reviews() {
  const data = await getReviews();
  return <ReviewsView data={data} />;
}
