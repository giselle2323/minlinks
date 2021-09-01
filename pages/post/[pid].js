import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import { SupabaseUserContext } from "../../context/userContext";
import { useUser } from "@auth0/nextjs-auth0";
import { supabase } from "../../utils/supabase";
import Loader from "../../components/Loader/loader";
import Admin from "../../layouts/Admin";
import EditPostModal from "../../components/Modals/EditPost";
import CommenPostModal from "../../components/Modals/commentPostModal";

//i ned the data here only reason i used getinitial post here.
const Post = ({ post }) => {
  const router = useRouter();
  const globalAuthor = useContext(SupabaseUserContext);
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikes] = useState(post.likes.length);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showCommentPostModal, setShowCommentPostModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      const lik = post.likes.filter((ik) => ik.userId.email === user.email);
      const bookmrk = post.bookmarks.filter(
        (bk) => bk.userId.email === user.email
      );
      lik.length > 0 ? setLiked(true) : setLiked(false);
      bookmrk.length > 0 ? setBookmarked(true) : setBookmarked(false);
    }
    setLoading(false);
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

  const toggleModal = () => {
    setShowEditPostModal(!showEditPostModal);
  };

  const togglePostCommentModal = () => {
    setShowCommentPostModal(!showCommentPostModal);
  };

  const deletePost = async (id) => {
    let confirmAction = confirm("Are you sure you want to delete this post ?");
    if (confirmAction) {
      setLoading(true);
      const { error } = await supabase.from("posts").delete().match({ id: id });
      if (error) {
        toast.error("An error occured, kindly try again");
      }
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
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
      {isLoading ? (
        <Loader />
      ) : (
        <section className="text-white flex justify-center w-full h-full">
          {showEditPostModal && (
            <EditPostModal
              open={showEditPostModal}
              onCloseModal={toggleModal}
              id={post.id}
              author={globalAuthor}
              title={post.title}
              body={post.body}
              tag={post.tag}
              links={post.links}
            />
          )}
          {showCommentPostModal && (
            <CommenPostModal
              open={showCommentPostModal}
              onCloseModal={toggleModal}
              postId={post.id}
              author={globalAuthor}
            />
          )}
          <div className="container mx-auto flex flex-col px-4 md:flex-row md:px-32 py-24 ">
            <div className="w-full md:w-9/12 mr-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h1 className="title-font text-2xl font-medium text-white capitalize py-2">
                    {post.title}
                  </h1>
                  <p className='text-base mb-4'><span className='text-white text-opacity-25 text-base normalcase'>{moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                </div>
                
              </div>
              <p className="mb-8 leading-relaxed text-xl  normal-case font-light">{post.body}</p>
              <div className="comments flex flex-col overflow-y-auto ">
                <div className="flex justify-between my-3">
                  <h3 className="text-xl my-2">Comments</h3>
                  {globalAuthor ? (
                    <button className="border border-white rounded p-2 m-2 " onClick={togglePostCommentModal}>
                      Add Comment
                    </button>
                  ) : (
                    <Link href="/api/auth/login">Login to comment</Link>
                  )}
                </div>
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div
                      key={comment.userId.id}
                      className="border border-gray-800 px-3 py-4 mb-3 bg-dark-500"
                    >
                      <p className="text-lg py-2">{comment.userId.name} at <span className='text-white text-opacity-25 text-lg normalcase'>{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                      <p className="text-base py-2 font-light">{comment.body}</p>
                    </div>
                  ))
                ) : (
                  <p>There is no comment on this post yet</p>
                )}
              </div>
            </div>

            <div className=" flex flex-col justify-center w:full md:w-3/12">
              {user ? (
                <div className="flex flex-col justify-center p-3">
                  <button
                    onClick={() => clickLike(post.id, post.authorId)}
                    className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none rounded text-lg m-3"
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
                    className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none rounded text-lg m-3"
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
                    className="text-center text-white bg-transparent border-0 py-2 px-8 focus:outline-none rounded text-lg m-3"
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
              {globalAuthor.length > 0 ? (
                  <div className=" flex flex-col">
                    <button
                      className="bg-green-transparent bg-opacity-25 text-green-transparent p-3 rounded border-0 m-3"
                      onClick={toggleModal}
                    >
                      Edit Post
                    </button>
                    <button
                      className="bg-red-500 bg-opacity-25 text-white p-3 rounded border-0 m-3"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete Post
                    </button>
                  </div>
                ) : (
                  ""
                )}
            </div>
          </div>
        </section>
      )}
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
    created_at,
    comments(
      id, 
      body,
      userId(id, name),
      created_at
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
Post.layout = Admin;
export default Post;
