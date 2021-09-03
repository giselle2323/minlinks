import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SupabaseUserContext } from "../context/userContext";
import { toast } from "react-toastify";
import ArticleCard from "../components/Cards/Card";
import Loader from "../components/Loader/loader";
import Admin from "../layouts/Admin";
export default function Bookmarks() {
  const author = useContext(SupabaseUserContext);
  const [bookmarkList, setBookmarks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchBookmarks() {
      const { data, error } = await supabase
        .from("bookmarks")
        .select(
          `
        id, 
        userId(id, email),
        postId(
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
        )`,
          { count: "exact" }
        )
        .filter("userId", "eq", author.length > 0 ? author[0].id : -1);
      setBookmarks(data);
      setLoading(false);
      error && toast.error("something went wrong");
    }
    fetchBookmarks();
  }, [author]);

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <ul
          role="list"
          className={bookmarkList.length > 0 ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto" : "flex justify-center"}
        >
          {bookmarkList.length > 0 ? (
            bookmarkList.map(({ id, postId }) => (
              <ArticleCard
                key={id}
                id={postId.id}
                title={postId.title}
                body={postId.body}
                comments={postId.comments}
                likes={postId.likes}
                tag={postId.tag}
                author={postId.authorId}
                bookmarks={postId.bookmarks}
              />
            ))
          ) : 
          (
            <div>
              <h2 className="text-dark-700 text-3xl my-14 dark:text-white">
                Hey buddy, you have no bookmarks yet.{" "}
              </h2>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

Bookmarks.layout = Admin;
