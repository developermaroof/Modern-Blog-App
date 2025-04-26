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
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email" // Changed to email type for better validation
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            defaultChecked
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save my email and name for the next time I comment
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 mb-4">
          {errorMessage || "All fields are required!"}
        </p>
      )}
      <div>
        <button
          type="button"
          onClick={handleCommentSubmission}
          disabled={isSubmitting}
          className={`transition duration-500 ease ${
            isSubmitting ? "bg-gray-500" : "bg-pink-600 hover:bg-indigo-900"
          } inline-block rounded-full py-3 px-8 cursor-pointer text-white`}
        >
          {isSubmitting ? "Submitting..." : "Post Comment"}
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
