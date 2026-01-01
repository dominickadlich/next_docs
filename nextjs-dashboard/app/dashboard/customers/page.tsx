import { Metadata } from "next"
import { CarouselDemo } from "@/app/ui/customers/carousel"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: 'Customers'
}

export default function Page() {
    return (
        <>
        <p>
            Customers Page
        </p>
        <div>
            <Suspense fallback='Loading...'>
                <CarouselDemo />
            </Suspense>
        </div>
        </>
    )
}