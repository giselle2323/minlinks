import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SupabaseUserContext } from "../context/userContext";
import { toast } from "react-toastify";
import ArticleCard from "../components/Cards/Card";
import Loader from "../components/Loader/loader";
import Admin from "../layouts/Admin";
export default function MyIdeas() {
  const author = useContext(SupabaseUserContext);
  const [myIdeasList, setMyIdeasList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchMyIdeas() {
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
      setMyIdeasList(data);
      setLoading(false);
      error && toast.error("something went wrong");
    }
    fetchMyIdeas();
    
  }, [author]);

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
        >
          {myIdeasList.length > 0 ? (
            myIdeasList.map(
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
            <h2 className="text-dark-700 dark:text-white">Hey buddy, you have not created any idea. Click the button above to create one </h2>
          )}
        </ul>
      )}
    </div>
  );
}

MyIdeas.layout = Admin;
