import React, {useState} from 'react';
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import {fetchArticlesIdeas} from '../hooks/useArticles';
import Admin from "../layouts/Admin";
import ArticleCard from "../components/Cards/Card";
export default function Dashboard () {
    const { data: articlesIdeas } = useQuery('articlesIdeas', fetchArticlesIdeas);
    console.log(articlesIdeas.map(idea => (
      console.log(idea)
    )))

    return (
    <main className="flex flex-col w-full">
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {articlesIdeas.map(({title, id, body, comments, likes}) => (
                <ArticleCard 
                  key={id}  
                  title={title} 
                  body={body}
                  comments={comments}
                  likes={likes}
                />
            ))}
        </ul>
    </main>
    )
}

Dashboard.layout = Admin;

export async function getStaticProps() {
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery('articlesIdeas', fetchArticlesIdeas)
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
