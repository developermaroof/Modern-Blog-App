import { getPosts, getPostDetails } from "@/services";
import React from "react";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from "@/components";

// 1. generateStaticParams stays the same
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ node: { slug } }) => ({ slug }));
}

// 2. Await `params` in your Server Component
export default async function PostDetails({ params }) {
  // unwrap the params promise
  const { slug } = await params;

  try {
    const post = await getPostDetails(slug);

    if (!post) {
      return <Loader />;
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
            <div className="col-span-1 lg:col-span-8">
              <PostDetail post={post} />
              <Author author={post.author} />
              <CommentsForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8 space-y-8">
                <PostWidget
                  slug={post.slug}
                  category={post.category?.map((cat) => cat.slug) || []}
                />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PostDetails:", error);
    return (
      <div className="bg-gradient-to-b from-indigo-900/10 to-purple-900/5 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Error loading post
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sorry, there was a problem loading this post.
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
