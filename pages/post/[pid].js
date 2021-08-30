import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useUser } from "@auth0/nextjs-auth0";
import { supabase } from "../../utils/supabase";
import Loader from "../../components/Loader/loader";

//i ned the data here only reason i used getinitial post here.
const Post = ({ post }) => {
  const router = useRouter();
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikes] = useState(post.likes.length);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      const lik = post.likes.filter((ik) => ik.userId.email === user.email);
      const bookmrk = post.bookmarks.filter(
        (bk) => bk.userId.email === user.email
      );
      lik.length > 0 ? setLiked(true) : setLiked(false);
      bookmrk.length > 0 ? setBookmarked(true) : setBookmarked(false);
      setLoading(false);
    }
  }, [user, post.bookmarks, post.likes]);

  const clickLike = async (id, author) => {
    if (user) {
      setLiked(!liked);
      setLikes(liked ? likesCount - 1 : likesCount + 1);
      liked ? removelike(id) : addLike(id, author);
    } else {
      router.push("/api/auth/login");
    }
  };

  const bookmarkPost = async (id, author) => {
    if (user) {
      setBookmarked(!bookmarked);
      bookmarked ? removeBookmark(id) : addBookmark(id, author);
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

  const addBookmark = async (id, author) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert([{ postId: id, userId: author.id }]);
  };

  const removeBookmark = async (id) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("postId", id);
  };

  return (
    <>
      <section className="text-gray-600 body-font flex">
        <div className="container mx-auto w-3/4 flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              {post.title}
            </h1>
            <p className="mb-8 leading-relaxed">{post.body}</p>
          </div>
        </div>
        <div className=" flex flex-col w-1/4 justify-center ">
          {user ? (
            <div className="flex flex-col justify-center p-3">
              <button
                onClick={() => clickLike(post.id, post.authorId)}
                className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg m-3"
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
              </button>
              <button
                onClick={() => bookmarkPost(post.id, post.authorId)}
                className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg m-3"
              >
                {bookmarked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center p-3">
              <button
                onClick={() => router.push("/api/auth/login")}
                className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg m-3"
              >
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
              </button>
              <button
                onClick={() => router.push("/api/auth/login")}
                className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg m-3"
              >
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
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

Post.getInitialProps = async (ctx) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    id, 
    title, 
    body, 
    tag, 
    links,
    authorId(id, name, email),
    comments(
      id, 
      body,
      userId(id, name)
    ),
    likes(
      id,
      postId,
      userId(id, name, email)
    ),
    bookmarks(
      id,
      postId,
      userId(id, name, email)
    )
  `
    )
    .filter("id", "eq", parseInt(Object.values(ctx.query.pid)[0], 10))
    .single();

  return { post: data, error: error };
};

export default Post;
