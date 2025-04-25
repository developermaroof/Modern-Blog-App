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

// Define the generateStaticParams function for static generation
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(({ node: { slug } }) => ({
    slug: slug,
  }));
}

// This is the main component for the page
export default async function PostDetails({ params }) {
  const post = await getPostDetails(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-10 mb-8">
        <div className="text-center">Post not found</div>
      </div>
    );
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
}
