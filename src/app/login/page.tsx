import LoginForm from "@/app/login/LoginForm";
import {Suspense} from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}