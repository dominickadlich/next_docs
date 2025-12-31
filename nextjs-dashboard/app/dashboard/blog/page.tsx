import { Suspense } from "react";
import { cookies } from "next/headers";
import { cacheLife } from "next/cache";
import Link from "next/link";


export default function BlogPage() {
    return (
        <>
            {/* Static content - prerendered automatically */}
            <header>
                <h1>The Blog</h1>
                <nav>
                    <Link href='/'>Home</Link> | <Link href='dashboard/invoices'>Invoices</Link>
                </nav>
            </header>

            {/* Cached dynamic content - included in the static shell */}
            <BlogPosts />

            {/* Runtime dynamic content - streams at request time */}
            <Suspense fallback={<p>Loading your preferences...</p>}>
                <UserPreferences />
            </Suspense>
        </>
    )
}


async function BlogPosts() {
    'use cache'
    cacheLife('hours')

    const res = await fetch('https://api.vercel.app/blog')
    const posts = await res.json()


    return (
        <section>
            <h2>Latest Posts</h2>
            <ul>
                {posts.slice(0, 5).map((post: any) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>
                            By {post.author} on {post.date}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}


// Personalized per user based on their cookie
async function UserPreferences() {
    const theme = (await cookies()).get('theme')?.value || 'dark'
    const favoriteCategory = (await cookies()).get('category')?.value

    return (
        <aside>
            <p>Your Theme: {theme}</p>
            {favoriteCategory && <p>Favorite Category: {favoriteCategory}</p>}
        </aside>
    )
}