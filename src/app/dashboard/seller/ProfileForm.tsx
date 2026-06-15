"use client";

import { useActionState, useState } from "react";
import type { Seller } from "@/lib/definitions";
import {
  editSellerProfile,
  type SellerProfileState,
} from "@/lib/action";
import styles from "./sellers.module.css";

export default function ProfileForm({ seller }: { seller: Seller }) {
  const initialState: SellerProfileState = {
    message: null,
    errors: {},
    };
    
   const[openForm, setOpenForm] = useState(false)

  const [state, formAction, isPending] = useActionState(
    editSellerProfile,
    initialState
  );

    return (
        <>
            <button onClick={() => setOpenForm(true)} className={styles.button}>
                Edit My Information
            </button>
            {openForm ? (
            <form action={formAction} className={styles.profileForm}>
      <input type="hidden" name="id" value={seller.id} />

      <div className={styles.formGroup}>
        <label htmlFor="name">Seller name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={seller.name}
          required
        />
        {state.errors?.name && (
          <p className={styles.errorMessage}>{state.errors.name[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={seller.bio ?? ""}
          rows={3}
        />
        {state.errors?.bio && (
          <p className={styles.errorMessage}>{state.errors.bio[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="story">Story</label>
        <textarea
          id="story"
          name="story"
          defaultValue={seller.story ?? ""}
          rows={6}
        />
        {state.errors?.story && (
          <p className={styles.errorMessage}>{state.errors.story[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image_url">Image URL</label>
        <input
          id="image_url"
          name="image_url"
          type="text"
          defaultValue={seller.image_url ?? ""}
          required
        />
        {state.errors?.image_url && (
          <p className={styles.errorMessage}>{state.errors.image_url[0]}</p>
        )}
      </div>

      {state.message && <p className={styles.errorMessage}>{state.message}</p>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
            </form>
            ): ""}
            </>
  );
}
