import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useUser } from "@auth0/nextjs-auth0";
import { SupabaseUserContext } from "../context/userContext";
import { toast } from "react-toastify";
import Select from "react-select";
import { fetchArticlesIdeas } from "../hooks/useArticles";
import ArticleCard from "../components/Cards/Card";
import Loader from "../components/Loader/loader";
import Admin from "../layouts/Admin";
export default function Dashboard() {
  const ref = useRef();
  const author = useContext(SupabaseUserContext);
  const { user, error, loading } = useUser();
  const allPosts = useRef(useQuery("articlesIdeas", fetchArticlesIdeas));
  const [ideas, setIdeas] = useState(
    useQuery("articlesIdeas", fetchArticlesIdeas)
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const router = useRouter();

  const handleChange = async (selectedOption) => {
    if (selectedOption.value.toLowerCase().trim() === "all") {
      setIdeas(allPosts.current);
    } else {
      setSelectedOption(selectedOption);
      const search = ideas.data.posts.filter(
        (post) =>
          selectedOption.value.toLowerCase().trim() ===
          post.tag.toLowerCase().trim()
      );
      if (search.length > 0) {
        setIdeas({
          ...ideas,
          data: {
            ...ideas.data,
            posts: [...search],
          },
        });
      } else {
        setIdeas(allPosts.current);
      }
    }
  };

  const options = [
    { value: "all", label: "All" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "serverless", label: "Serverless" },
    { value: "other", label: "other" },
  ];

  const customStyles = {
    
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: "gray",
      padding: 20,
    }),
  };
  return (
    <div className="flex flex-col">
      <div className="flex px-3 mb-3">
        <div className="flex items-center">
          <h3>Filter By:</h3>
        </div>
        <div className="flex flex-1">
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isSearchable={true}
            styles={customStyles}
          />
        </div>
      </div>
      <div className="overflow-y-auto">
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
            <h2 className="text-3xl text-center">No data to display</h2>
          )}
        </ul>
      </div>
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
