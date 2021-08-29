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
  links,
  tag,
  author,
}) {
  const router = useRouter();
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikes] = useState(likes.length);

  useEffect(() => {
    if (user && user.email === author.email) {
      setLiked(true);
    }
  }, [user, author.email]);

  const likePost = async (id, author) => {
    console.log(id, author.id);
    if (user) {
      setLiked(!liked);
      setLikes(liked ? likesCount - 1 : likesCount + 1);
      liked ? removelike(id) : addLike(id, author);
    } else {
      router.push("/api/auth/login");
    }
  };

  const addLike = async (id, author) => {
    const { data, error } = await supabase
      .from("likes")
      .insert([{ postId: id, userId: author.id }]);
  };

  const removelike = async (id) => {
    const { data, error } = await supabase
      .from("likes")
      .delete()
      .eq("postId", id);
  };

  return (
    <div className="card m-2 cursor-pointer  border border-gray-800 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
      <div className="m-3 flex flex-col flex-1">
        <h2 className="text-lg mb-2">
          {title}
          <span className="text-sm text-teal-800 font-mono bg-green-500 inline rounded-full px-2 align-top float-right animate-pulse">
            {tag}
          </span>
        </h2>
        <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 flex-1">
          {body}
        </p>
      </div>
      <div className="m-3">
        <span
          onClick={() => likePost(id, author)}
          className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
        >
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
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
        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
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
