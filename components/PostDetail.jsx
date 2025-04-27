import moment from "moment";
import React from "react";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3
            key={index}
            className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p
            key={index}
            className="mb-8 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4
            key={index}
            className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="rounded-lg shadow-md my-8"
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-8">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-cover w-full h-full rounded-t-xl max-h-96"
        />
      </div>
      <div className="px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 w-full">
          <div className="flex items-center mb-6 md:mb-0">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              height="40px"
              width="40px"
              className="align-middle rounded-full border-2 border-indigo-100"
            />
            <p className="inline align-middle text-gray-700 dark:text-gray-300 ml-3 text-lg font-medium">
              {post.author.name}
            </p>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-2 text-indigo-500"
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
        <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100">
          {post.title}
        </h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
