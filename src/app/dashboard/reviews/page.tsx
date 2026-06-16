import ReviewRows from "@/app/dashboard/reviews/ReviewRows";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews Dashboard",
  description:
    "View customer ratings and reviews to improve your products and seller experience.",
};

export default function Page() {
    return <ReviewRows />
}