import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useUser } from "@auth0/nextjs-auth0";
import { SupabaseUserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { fetchArticlesIdeas } from "../hooks/useArticles";
import ArticleCard from "../components/Cards/Card";
import Loader from "../components/Loader/loader";
import Admin from "../layouts/Admin";
export default function Dashboard() {
  const author = useContext(SupabaseUserContext);
  const { user, error, loading } = useUser();
  const [ideas, setIdeas] = useState(
    useQuery("articlesIdeas", fetchArticlesIdeas)
  );

  const router = useRouter();

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      >
        {ideas.data.posts.length > 0 ? (
          ideas.data.posts.map(
            ({
              title,
              id,
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
          <h2>No data to display</h2>
        )}
      </ul>
    </div>
  );
}

Dashboard.layout = Admin;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("articlesIdeas", fetchArticlesIdeas);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
