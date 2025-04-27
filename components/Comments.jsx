"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "@/services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getComments(slug);
        setComments(result);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
          Comments
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
      </div>
    );
  }

  return (
    <>
      {comments.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-gray-100 dark:border-gray-700 mb-6 pb-6 last:border-0 last:pb-0 last:mb-0"
            >
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold text-sm">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {comment.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {moment(comment.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 mt-3">
                {parse(comment.comment)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
            Comments
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}
    </>
  );
};

export default Comments;
