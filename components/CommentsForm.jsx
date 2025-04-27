"use client";
import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "@/services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    // Load saved user data from localStorage
    nameEl.current.value = window.localStorage.getItem("name") || "";
    emailEl.current.value = window.localStorage.getItem("email") || "";
  }, []);

  const handleCommentSubmission = async () => {
    setError(false);
    setErrorMessage("");
    setShowSuccessMessage(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    // Form validation
    if (!comment || !name || !email) {
      setError(true);
      setErrorMessage("All fields are required!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address");
      return;
    }

    const commentObj = { name, email, comment, slug };

    // Handle localStorage
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    setIsSubmitting(true);

    try {
      await submitComment(commentObj);
      setShowSuccessMessage(true);
      commentEl.current.value = ""; // Clear comment field after successful submission

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (err) {
      setError(true);
      setErrorMessage("Failed to submit comment. Please try again.");
      console.error("Comment submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8">
      <h3 className="text-xl font-bold mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
        Leave a Comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition duration-300"
          placeholder="Write your comment here..."
          name="comment"
          rows="6"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          ref={nameEl}
          className="py-3 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition duration-300"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="py-3 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-indigo-400 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition duration-300"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            defaultChecked
            className="accent-indigo-500"
          />
          <label
            htmlFor="storeData"
            className="text-gray-600 dark:text-gray-400 cursor-pointer ml-2"
          >
            Save my information for next time
          </label>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 mb-4 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
          {errorMessage || "All fields are required!"}
        </p>
      )}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleCommentSubmission}
          disabled={isSubmitting}
          className={`transition duration-300 ease ${
            isSubmitting
              ? "bg-gray-500"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          } inline-block rounded-full py-3 px-8 cursor-pointer text-white font-medium transform hover:-translate-y-1`}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
        {showSuccessMessage && (
          <span className="ml-4 text-green-500 font-semibold">
            Comment submitted for review!
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
