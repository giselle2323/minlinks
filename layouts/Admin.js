import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import AddPost from "../components/Modals/AddPostModal";
import { SupabaseUserProvider } from "../context/userContext";
import AdminNavbar from "../components/Navbars/AdminNavbar";

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
    // setLoading(true);
    const { error } = await supabase.from("posts").insert([values]);

    if (error) {
      toast.error("An error occured, kindly try again");
    }
    window.location.reload();
  };

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex overflow-hidden font-sans container mx-auto">
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
      <div className="flex-col container mx-auto">
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
