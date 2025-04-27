"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 text-gray-800 dark:text-gray-100">
        Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900 transition duration-300">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
