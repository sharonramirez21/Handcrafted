"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { Product } from "@/lib/definitions";
import { updateProduct, type EditProductFormState } from "@/lib/action";
import styles from "./EditProduct.module.css";

const initialState: EditProductFormState = {
  errors: {},
  message: null,
};

export default function EditProductForm({ product }: { product: Product }) {
  const [state, formAction, isPending] = useActionState(
    updateProduct,
    initialState,
  );
  const [hasChanges, setHasChanges] = useState(false)

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Seller Dashboard</p>
          <h1>Edit Product</h1>
          <p className={styles.description}>
            Update the product information for your Handcrafted Haven store.
          </p>
        </div>

      
      </div>

      <form action={formAction} className={styles.form} onChange={()=>setHasChanges(true)}>
        <input type="hidden" name="id" value={product.id} />

        <div className={styles.field}>
          <label htmlFor="name">Product name</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product.name}
          />

          {state.errors?.name && (
            <p className={styles.error}>{state.errors.name[0]}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={product.description}
          />

          {state.errors?.description && (
            <p className={styles.error}>{state.errors.description[0]}</p>
          )}
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product.price}
            />

            {state.errors?.price && (
              <p className={styles.error}>{state.errors.price[0]}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              defaultValue={product.stock}
            />

            {state.errors?.stock && (
              <p className={styles.error}>{state.errors.stock[0]}</p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={product.category}
          >
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
          <label htmlFor="image_url">Image URL or path</label>
          <input
            id="image_url"
            name="image_url"
            type="text"
            defaultValue={product.image_url ?? ""}
            placeholder="/products/mug.jpg"
          />

          {state.errors?.image_url && (
            <p className={styles.error}>{state.errors.image_url[0]}</p>
          )}
        </div>

        {state.message && <p className={styles.formMessage}>{state.message}</p>}

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending || !hasChanges}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
