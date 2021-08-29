import React, { useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useLoadItems } from "../utils/dataLoad";
import { fetchArticlesIdeas } from "../hooks/useArticles";
import { getMoreArticles } from "../hooks/useGetMorePosts";
import Admin from "../layouts/Admin";
import ArticleCard from "../components/Cards/Card";
import Loader from "../components/Loader/loader";
export default function Dashboard() {
  const [ideas, setIdeas] = useState(
    useQuery("articlesIdeas", fetchArticlesIdeas)
  );
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems(20, ideas.data.count);

  console.log(items)
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <main className="flex flex-col w-full">
      <ul
        role="list"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      >
        {ideas.data.posts.map(({ title, id, body, comments, likes, tag, authorId}) => (
          <ArticleCard
            key={id}
            id={id}
            title={title}
            body={body}
            comments={comments}
            likes={likes}
            tag={tag}
            author={authorId}
          />
        ))}
        {/* {(loading || hasNextPage) && (
          <ArticleCard ref={sentryRef}>
            <Loader />
          </ArticleCard>
        )} */}
      </ul>
    </main>
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
