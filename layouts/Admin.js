import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import AddPost from "../components/Modals/AddPostModal";
import { SupabaseUserProvider } from "../context/userContext";

export default function Admin({ children }) {
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [author, setAuthor] = useState([]);
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function findUser() {
      const { data } = await supabase
        .from("users")
        .select(`id, email`)
        .filter("email", "eq", user.email);

      if (data.length > 0) {
        setAuthor(data);
      } else {
        const { data, error } = await supabase
          .from("users")
          .insert({ name: user.name, email: user.email });
        setAuthor(data);
        // error && toast.error("An error occured, please try again");
      }
    }
    if (user) {
      findUser();
    }
  }, [user]);

  const toggleModal = () => {
    setShowAddPostModal(!showAddPostModal);
  };

  const submitPost = async (values) => {
    const { data, error, isLoading } = await supabase
      .from("posts")
      .insert([values]);

    if (error) {
      toast.error("An error occured, kindly try again");
    }
  };

  return (
    <main className="flex flex-col w-full">
      <div className="flex overflow-hidden font-sans container">
        <div className="flex flex-col w-full flex-1 overflow-hidden dark:bg-dark-700">
          <div className="relative z-10 flex-shrink-0  border-b border-gray-800 flex h-16">
            <div className="flex flex-col justify-center px-4">
              <h1 className="text-2xl">Hello {user ? user.name : "buddy"}</h1>
            </div>
            <div className="flex-1 px-4 py-4 flex justify-end">
              {author.length > 0 ? (
                <button
                  onClick={toggleModal}
                  className="text-center text-white border border-blue-800 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg m-3"
                >
                  New Post
                </button>
              ) : (
                <button
                  onClick={() => router.push("/api/auth/login")}
                  className="text-center text-white border border-blue-800 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg m-3"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end py-4 container">
        {showAddPostModal && (
          <AddPost
            open={showAddPostModal}
            onCloseModal={toggleModal}
            author={author}
            submitPost={submitPost}
          />
        )}
      </div>
      <div className="flex-col">
        <div className="flex">
          <ul className="flex">
            <li className="m-3">
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
            {author.length > 0 ? (
              <>
                <li className="m-3">
                  <Link href="/bookmarks">
                    <a>Bookmarks</a>
                  </Link>
                </li>
                <li className="m-3">
                  <Link href="/my-ideas">
                    <a>My Ideas</a>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
      <div>
        <SupabaseUserProvider value={author}>{children}</SupabaseUserProvider>
      </div>
    </main>
  );
}
