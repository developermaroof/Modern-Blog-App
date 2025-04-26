import { getPosts, getPostDetails } from "@/services";
import React from "react";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
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
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                category={post.category?.map((cat) => cat.slug) || []}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PostDetails:", error);
    return (
      <div className="container mx-auto px-10 mb-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Error loading post</h2>
          <p>Sorry, there was a problem loading this post.</p>
        </div>
      </div>
    );
  }
}
