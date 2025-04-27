import moment from "moment";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8">
      <div className="relative overflow-hidden pb-60">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-cover absolute h-full w-full transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>

        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center mb-2 sm:mb-0">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              height="30px"
              width="30px"
              className="align-middle rounded-full border-2 border-indigo-100"
            />
            <p className="inline align-middle text-gray-600 dark:text-gray-400 ml-2 text-sm">
              {post.author.name}
            </p>
          </div>

          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline mr-1 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="text-center">
          <Link href={`/post/${post.slug}`}>
            <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-6 py-2 transition duration-300 transform hover:-translate-y-1">
              Read More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
