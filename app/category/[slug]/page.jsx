import React from "react";
import { getCategoryPost, getCategories } from "@/services";
import { PostCard, Categories, Loader, PostWidget } from "@/components";
import Link from "next/link";

// 1. Tell Next.js which `slug` values to prerender
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(({ slug }) => ({ slug }));
}

// 2. Define the page as an async Server Component
export default async function CategoryPostPage({ params }) {
  // 1️⃣ Await the params
  const { slug } = await params;

  try {
    // 2️⃣ Then use slug
    const posts = await getCategoryPost(slug);
    const categories = await getCategories();

    const categoryName =
      categories.find((cat) => cat.slug === slug)?.name || slug;

    // Optional: show a loader or fallback UI if needed
    if (!posts) {
      return <Loader />;
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-8 pt-8">
            <div className="flex flex-col items-center mb-8 text-center">
              <span className="px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium mb-3">
                Category
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {categoryName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse all posts in the {categoryName} category
              </p>
              <Link href="/">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                  &larr; Back to Home
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="col-span-1 lg:col-span-8">
                {posts.length > 0 ? (
                  posts.map((post, i) => <PostCard key={i} post={post.node} />)
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                      No posts in this category
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Check back later for new content!
                    </p>
                  </div>
                )}
              </div>
              <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8 space-y-8">
                  <PostWidget />
                  <Categories />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in CategoryPostPage:", error);
    return (
      <div className="bg-gradient-to-b from-indigo-900/10 to-purple-900/5 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Error loading category
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sorry, there was a problem loading this category.
            </p>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-6 py-2 transition duration-300 transform hover:-translate-y-1"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
