"use client";

import { handleSignOut } from "@/lib/action";
import Link from "next/link";
import {SessionProvider, useSession} from "next-auth/react"; // Safe for client components

function ShowSignOutInBtn() {
    // 1. Grab the session state directly from the client cache
    const { data: session } = useSession();
    const isLoggedIn = !!session;

    return (
        <div>
            {isLoggedIn ? (
                <form action={handleSignOut}>
                    <button type="submit" className="dashboard-button">
                        Sign Out
                    </button>
                </form>
            ) : (
                <Link href="/login" className="dashboard-button">
                    Seller Login
                </Link>
            )}
        </div>
    );
}

export default function SignOutInBtn() {
    return (
        <SessionProvider>
           <ShowSignOutInBtn />
        </SessionProvider>
    );
}