'use client';

import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/action';
import { useSearchParams } from 'next/navigation';
import closedEye from '../../../public/icons/closed-eye.svg'
import openEye from '../../../public/icons/open-eye.svg'
import styles from "./login.module.css";
import Image from "next/image";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.leftSide}>
                    <h1>Hello!</h1>
                    <p>
                        Welcome back to Handcrafted.
                        Discover unique handmade products.
                    </p>
                </div>

                <div className={styles.rightSide}>
                    <span className="disable-grid" style={{ display: 'none' }} />
                    <form action={formAction} className={styles.loginForm}>
                        <h3>
                            Welcome Back
                        </h3>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div id={styles.passwordInput}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                            <button
                                id={styles.showPasswordBtn}
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <Image
                                    src={showPassword ? openEye : closedEye}
                                    alt=""
                                    width={20}
                                    height={20}
                                    priority
                                />
                            </button>
                        </div>
                        <input type="hidden" name="redirectTo" value={callbackUrl} />
                        <button className={styles.btnLogin} aria-disabled={isPending}>Log In</button>
                        <div>
                            {errorMessage && (
                                <>
                                    <p>{errorMessage}</p>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}