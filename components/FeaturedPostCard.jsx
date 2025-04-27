import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-80 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-2xl transform hover:-translate-y-1">
    <div
      className="absolute rounded-xl bg-center bg-no-repeat bg-cover w-full h-80"
      style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
    />
    <div className="absolute rounded-xl bg-gradient-to-b from-gray-800/60 via-gray-800/70 to-black w-full h-80" />
    <div className="flex flex-col rounded-xl p-6 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-xs font-medium bg-indigo-600 px-3 py-1 rounded-full">
        {moment(post.createdAt).format("MMM DD, YYYY")}
      </p>
      <p className="text-white mb-6 text-shadow font-bold text-2xl text-center line-clamp-2">
        {post.title}
      </p>
      <div className="flex items-center absolute bottom-6 w-full justify-center">
        <Image
          unoptimized
          alt={post.author.name}
          height={35}
          width={35}
          className="align-middle drop-shadow-lg rounded-full border-2 border-white"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-white text-shadow ml-2 font-medium">
          {post.author.name}
        </p>
      </div>
    </div>
    <Link href={`/post/${post.slug}`}>
      <span className="cursor-pointer absolute w-full h-full" />
    </Link>
  </div>
);

export default FeaturedPostCard;
