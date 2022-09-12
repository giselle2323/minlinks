import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import AddPost from "../components/Modals/AddPostModal";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { SupabaseUserProvider } from "../context/userContext";
import { supabase } from "../utils/supabase";

export default function Admin({ children, pageTitle, description }) {
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [author, setAuthor] = useState([]);
  const { user} = useUser();
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
        error ? console.log('error getting user') : ''
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
    const { error } = await supabase.from("posts").insert([values]);
    if (error) {
      toast.error("An error occured, kindly try again");
    }
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{pageTitle}</title>
      </Head>
      <main className="flex flex-col w-full h-full bg-white dark:bg-dark-700 font-ibm">
        <div className="flexfont-sans container mx-auto">
          <AdminNavbar author={author} />
        </div>
        <div className="flex justify-end container mx-auto">
          {showAddPostModal && (
            <AddPost
              open={showAddPostModal}
              onCloseModal={toggleModal}
              author={author}
              submitPost={submitPost}
            />
          )}
        </div>
        <div className="flex flex-wrap justify-between items-center flex-row container mx-auto px-2 md:px-5 mb-6">
          <div className="flex">
            <ul className="flex">
              <li
                className={
                  router.pathname == "/dashboard"
                    ? "text-red-600 dark:text-red-600 my-3 lg:m-3 mx-2"
                    : "lg:m-3 my-3 mx-2"
                }
              >
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              {author.length > 0 ? (
                <>
                  <li
                    className={
                      router.pathname == "/bookmarks"
                        ? "text-green-transparent lg:m-3 mx-2 my-3"
                        : "lg:m-3 my-3 mx-2"
                    }
                  >
                    <Link href="/bookmarks">
                      <a>Bookmarks</a>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/my-ideas"
                        ? "text-green-transparent lg:m-3 mx-2 my-3"
                        : "lg:m-3 my-3 mx-2"
                    }
                  >
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
          <div className="flex items-center">
            <button
              onClick={toggleModal}
              className="mx-2 lg:mb-0 my-3 lg:my-3 lg:mb-4 lg:mr-3 py-2 px-6 rounded text-lg dark:text-green-grad-one bg-green-400"
            >
              New Post{" "}
            </button>
          </div>
        </div>
        <div className="container mx-auto">
          <SupabaseUserProvider value={author}>{children}</SupabaseUserProvider>
        </div>
      </main>
    </>
  );
}
