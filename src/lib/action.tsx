'use server';

import { AuthError } from 'next-auth';
import {signIn, signOut} from "@/auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
    console.log("signOut");
    await signOut({ redirectTo: '/' });
}


export async function deleteProduct(productId: string) {
    const session = await auth();
    const sellerEmail = session?.user?.email;

    if (!sellerEmail) {
        throw new Error("Seller email was not found in the session.");
    }

    try {
        await sql.begin(async (sql) => {
            await sql`
            DELETE FROM reviews
            WHERE product_id = ${productId};
            `;

        const deletedProduct = await sql<{ id: string }[]>`
            DELETE FROM products
            WHERE products.id = ${productId}
            AND products.seller_id = (
            SELECT sellers.id
            FROM sellers
            WHERE sellers.email = ${sellerEmail}
            )
            RETURNING id;
            `;

        if (deletedProduct.length === 0) {
        throw new Error(
        "Product was not found or you do not have permission to delete it.",
        );
        }
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to delete product.");
    }

    revalidatePath("/dashboard/products");
}

