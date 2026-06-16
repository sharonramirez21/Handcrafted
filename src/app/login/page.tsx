import LoginForm from "@/app/login/LoginForm";
import { Metadata } from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Handcrafted Haven account to manage purchases, reviews, and artisan profiles.",
};
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}