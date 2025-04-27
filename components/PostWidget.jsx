"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "@/services";

const PostWidget = ({ category, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let result = [];

        if (slug && category) {
          // Make sure category is an array
          const categoryArray = Array.isArray(category) ? category : [category];
          console.log("Fetching similar posts with:", {
            slug,
            category: categoryArray,
          });
          result = await getSimilarPosts(categoryArray, slug);
        } else {
          console.log("Fetching recent posts");
          result = await getRecentPosts();
        }

        setRelatedPosts(result || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message || "Error fetching posts");
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug, category]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
          {slug ? "Related Posts" : "Recent Posts"}
        </h3>
        <div className="text-center py-4 text-gray-600 dark:text-gray-300">
          Loading posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
          {slug ? "Related Posts" : "Recent Posts"}
        </h3>
        <div className="text-center py-4 text-red-500">
          Failed to load posts
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts && relatedPosts.length > 0 ? (
        relatedPosts.map((post, index) => (
          <div
            key={index}
            className="flex items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
          >
            <div className="w-16 flex-none">
              <img
                src={post.featuredImage?.url || "/placeholder-image.jpg"}
                alt={post.title}
                height="60px"
                width="60px"
                className="align-middle rounded-full border-2 border-indigo-100"
              />
            </div>
            <div className="flex-grow ml-4 text-white hover:text-indigo-600  transition duration-300">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`} className="text-md font-medium">
                {post.title}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No related posts found</p>
      )}
    </div>
  );
};

export default PostWidget;
