"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createProduct, type ProductFormState } from "@/lib/action";
import styles from "./CreateProduct.module.css";


const initialState: ProductFormState = {
    errors: {},
    message: null,
};


export default function CreateProductForm() {
    const [state, formAction, isPending] = useActionState(
        createProduct,
        initialState,
    )
    return (<main className={styles.page}>
        <div className={styles.header}>
            <div>
                <p className={styles.eyebrow}>Seller Dashboard</p>
                <h1>Add new Product</h1>
                <p className={styles.description}> 
                    Create a new product for your Handcrafted store.
                </p>
            </div>
            <link href="/dashboard/products" className={styles.backLink} />
        </div>
        <form action={formAction} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="name">Product name</label>
                <input id="name" name="name" type="text" placeholder="Ceramic handmade muge" />
                {state.errors?.name && (
                    <p className={styles.error}>{state.errors.name[0]}</p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows={5} placeholder="Describe the product, materials, and details"></textarea>
                {state.errors?.description && (
                    <p className={styles.error}>{state.errors.description[0]}</p>
                )}
            </div>
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label htmlFor="price">Price</label>
                    <input id="price" name="price" type="number" step="0.01" min="0" />

                    {state.errors?.price && (
                    <p className={styles.error}>{state.errors.price[0]}</p>
                    )}
                </div>

                <div className={styles.field}>
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" name="stock" type="number" min="0" />

                    {state.errors?.stock && (
                    <p className={styles.error}>{state.errors.stock[0]}</p>
                    )}
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="category">Category</label>
                <select id="category" name="category" defaultValue="">
                    <option value="" disabled>
                    Select a category
                    </option>
                    <option value="Ceramics">Ceramics</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Woodwork">Woodwork</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Art">Art</option>
                </select>

                {state.errors?.category && (
                <p className={styles.error}>{state.errors.category[0]}</p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="image_url">Image URL</label>
                <input
                id="image_url"
                name="image_url"
                type="url"
                placeholder="/products/mug.jpg or https://example.com/image.jpg"
                />

                {state.errors?.image_url && (
                <p className={styles.error}>{state.errors.image_url[0]}</p>
                )}
            </div>

            {state.message && <p className={styles.formMessage}>{state.message}</p>}

            <div className={styles.actions}>
                <Link href="/dashboard/products" className={styles.cancelButton}>
                Cancel
                </Link>

                <button
                type="submit"
                className={styles.submitButton}
                disabled={isPending}
                >
                {isPending ? "Creating..." : "Create Product"}
                </button>
            </div>

        </form>
    </main>)
}