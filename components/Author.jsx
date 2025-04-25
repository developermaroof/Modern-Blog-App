import React from "react";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black/20">
      <div className="absolute left-0 right-2 -top-14">
        <img
          src={author.photo.url}
          alt={author.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
        />
        <h3>{author.name}</h3>
      </div>
    </div>
  );
};

export default Author;
