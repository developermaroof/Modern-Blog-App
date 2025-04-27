"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/services";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-800 shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <span className="cursor-pointer font-bold text-3xl text-white hover:text-indigo-200 transition duration-300">
                Pixel Quirk
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="text-gray-200 hover:text-white font-medium transition duration-300 border-b-2 border-transparent hover:border-indigo-300 pb-1 cursor-pointer">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu items */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="block py-2 text-gray-200 hover:text-white font-medium cursor-pointer">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
