import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import { SupabaseUserContext } from "../context/userContext";
import { useUser } from "@auth0/nextjs-auth0";
import { toast } from "react-toastify";
import ArticleCard from "../components/Cards/Card";
import Loader from "../components/Loader/loader";
import AddPost from "../components/Modals/AddPostModal";
import Admin from "../layouts/Admin";
export default function MyIdeas() {
  const author = useContext(SupabaseUserContext);
  const [bookmarkList, setBookmarks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchBookmarks() {
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
            )`,
          { count: "exact" }
        )
        .filter("authorId", "eq", author.length > 0 ? author[0].id : -1);
      setBookmarks(data);

      //   bookmarks.error && toast.error("something went wrong");
    }
    fetchBookmarks();
    setLoading(false);
  }, [author]);

  //   console.log(bookmarkList, author[0].id);
  //   console.log(bookmarkList);

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
        >
          {bookmarkList.length > 0 ? (
            bookmarkList.map(
              ({
                id,
                title,
                body,
                comments,
                likes,
                tag,
                authorId,
                bookmarks,
              }) => (
                <ArticleCard
                  key={id}
                  id={id}
                  title={title}
                  body={body}
                  comments={comments}
                  likes={likes}
                  tag={tag}
                  author={authorId}
                  bookmarks={bookmarks}
                />
              )
            )
          ) : (
            <h2>YOU HAVE NO posts </h2>
          )}
        </ul>
      )}
    </div>
  );
}

MyIdeas.layout = Admin;
