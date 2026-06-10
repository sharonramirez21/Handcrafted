import {auth} from "@/auth";

export default async function CreateProductPage() {
    const session = await auth();
    const sellerId = session!.user!.userId;

    return (
        <div>
            <h1>Hi</h1>
        </div>
    )
}