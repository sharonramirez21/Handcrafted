import { Metadata } from "next";
import CreateProductForm from "./CreateProductForm";


export const metadata: Metadata = {
  title: "Create Product",
  description:
    "Add a new handmade product with images, pricing, and detailed descriptions.",
};

export default async function CreateProductPage() {
    return <CreateProductForm />;
}