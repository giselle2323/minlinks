import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useUser } from "@auth0/nextjs-auth0";
import { useFindUser } from "../../hooks/useFindUser";
import { supabase } from "../../utils/supabase";

export default function ArticleCard({
  title,
  id,
  body,
  comments,
  likes,
  tag,
  bookmarks,
}) {
  const router = useRouter();
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikes] = useState(likes.length);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (user) {
      const lik = likes.filter((ik) => ik.userId.email === user.email);
      const bookmrk = bookmarks.filter((bk) => bk.userId.email === user.email);
      lik.length > 0 ? setLiked(true) : setLiked(false);
      bookmrk.length > 0 ? setBookmarked(true) : setBookmarked(false);
    }
  }, [user, bookmarks, likes]);

  return (
    <div
      onClick={() => router.push(`/post/${id}`)}
      className="card m-2 cursor-pointer flex flex-col  border border-gray-800 rounded-lg transform hover:-translate-y-1 transition-all duration-200"
    >
      <div className="m-3 flex flex-col flex-1">
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <h2 className="text-lg lg:mb-2 break-all">{title}</h2>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          {" "}
          <p className="font-light font-mono text-sm text-dark-700 dark:text-white dark:text-opacity-30 hover:text-gray-900 transition-all duration-200 flex-1 ellipsis">
            {body}
          </p>
        </div>
      </div>
      <div className="m-3 flex items-center">
        <div>
          <h2 className="text-sm text-teal-800 text-center font-mono bg-green-transparent bg-opacity-75 rounded px-2">
            {tag}
          </h2>
        </div>
        <span
          onClick={() => router.push(`/post/${id}`)}
          className="text-gray-400 mr-3 inline-flex text-center justify-center items-center  leading-none text-sm py-1"
        >
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="#C96073"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}

          {likesCount > 0 ? likesCount : ""}
        </span>
        <span className="text-gray-400 inline-flex items-center leading-none text-sm mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {comments.length ? comments.length : ""}
        </span>
        <span
          onClick={() => router.push(`/post/${id}`)}
          className="text-gray-400 inline-flex items-center leading-none text-sm"
        >
          {bookmarked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.object,
  comments: PropTypes.array,
  likes: PropTypes.array,
  links: PropTypes.string,
  tag: PropTypes.string,
  id: PropTypes.number,
};
