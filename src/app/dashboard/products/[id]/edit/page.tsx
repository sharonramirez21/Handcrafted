import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { fetchProductByIdForSellerEmail } from "@/lib/data";
import EditProductForm from "./EditProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
  description:
    "Update product details, pricing, images, and availability for your handmade items.",
};

export default async function EditProductPage({
    params,
}: {
    params: Promise<{id:string}>
    }) {
    
    const { id } = await params;

    const session = await auth();
    const sellerEmail = session?.user?.email;

    if (!sellerEmail) {
        throw new Error("Seller email was not found in the session.");
    }
    
    const product = await fetchProductByIdForSellerEmail(id, sellerEmail);
    

    if (!product) {
        notFound();
    }

    return <EditProductForm product={product} />;
}
