import {Product} from "@/lib/definitions";

interface FormData {
    sellerId: Product['seller_id'];
}

export default function CreateProductForm({ sellerId }: FormData) {
    return (
        <h1>Test</h1>
    )
}