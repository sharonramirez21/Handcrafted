'use client'

import { useState } from "react";
import submitReview from "./actions";
import styles from "./ReviewForm.module.css";

export default function ReviewForm({ productId }: { productId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const submitReviewWithId = submitReview.bind(null, productId);

    return (
        <div>
            {isOpen && (
                <form action={submitReviewWithId} className={styles.reviewForm}>
                    <label className={styles.labelForm} htmlFor="guest_name">Name</label>
                    <input className={styles.formInput} type="text" name="guest_name" id="guest_name" />
                    <label className={styles.labelForm} htmlFor="rating">Raiting</label>
                    <select className={styles.formInput} name="rating" id="rating">
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐</option>
                        <option value="3">3 ⭐</option>
                        <option value="4">4 ⭐</option>
                        <option value="5">5 ⭐</option>
                    </select>
                    <label className={styles.labelForm} htmlFor="comment">Comment</label>
                    <textarea className={styles.formInput} name="comment" id="comment" />
                    <button className={styles.btnForm}>Submit Review</button>
                </form>
            )}

            <button className={styles.btnForm} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Cancel" : "Submit Review"}
            </button>
        </div>
    )
}