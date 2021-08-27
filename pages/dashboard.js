import React, {useState} from 'react';
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration';
import InfiniteScroll from "react-infinite-scroll-component";
import {fetchArticlesIdeas} from '../hooks/useArticles';
import { getMoreArticles } from '../hooks/useGetMorePosts';
import Admin from "../layouts/Admin";
import ArticleCard from "../components/Cards/Card";
import { supabase } from '../utils/supabase';
export default function Dashboard () {
    const [ideas, setIdeas] = useState(useQuery('articlesIdeas', fetchArticlesIdeas));
    const [hasMore, setHasMore] = useState(true);
    const [rangeNumber, setRangeNumber] = useState(20);
    
    const getMoreArticles = async () => {
      const { data, error } = await supabase
      .from('posts')
      .select(`
        id, 
        title, 
        body, 
        tag, 
        links,
        authorId(id, name),
        comments(
          id, 
          body,
          userId(id, name)
        ),
        likes(
          id,
          postId,
          userId(id, name)
        )
    
      `)
      .range(rangeNumber, rangeNumber + 10)
      
      if(error) {
        throw new Error(error.message)
      }
      setRangeNumber(rangeNumber + 20);
      setIdeas((ideas) => [...ideas, ...data]);
      return data;
    };
  
console.log(ideas)
    return (
    <main className="flex flex-col w-full">
      <InfiniteScroll
        dataLength={50}
        next={getMoreArticles}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ideas.data.map(({title, id, body, comments, likes}) => (
                <ArticleCard 
                  key={id}  
                  title={title} 
                  body={body}
                  comments={comments}
                  likes={likes}
                />
            ))}
        </ul>
      </InfiniteScroll>
        
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
