'use server';

import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function submitReview(productId: string, formData: FormData) {
    const guest_name = formData.get("guest_name") as string;
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment") as string;

    await sql`
        INSERT INTO reviews (product_id, guest_name, rating, comment)
        VALUES (${productId}, ${guest_name}, ${rating}, ${comment})
    `;

    revalidatePath(`/products/${productId}`);
}