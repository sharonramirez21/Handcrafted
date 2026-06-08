import LoginForm from "@/app/login/LoginForm";
import styles from "./login.module.css";
import {Suspense} from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}