import React from "react";
import { getCategoryPost, getCategories } from "@/services";
import { PostCard, Categories, Loader } from "@/components";

// 1. Tell Next.js which `slug` values to prerender
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(({ slug }) => ({ slug }));
}

// 2. Define the page as an async Server Component
export default async function CategoryPostPage({ params }) {
  // 1️⃣ Await the params
  const { slug } = await params;
  // 2️⃣ Then use slug
  const posts = await getCategoryPost(slug);

  // Optional: show a loader or fallback UI if needed
  if (!posts) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, i) => (
            <PostCard key={i} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
