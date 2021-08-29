import React, { useState } from "react";

async function loadIdeas(lastRange, totalCount) {
  const { data } = await supabase
    .from("posts")
    .select(
      `
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
  
    `
    )
    .range(lastRange + 1, lastRange + 19);

  return { hasNextPage: totalCount > lastRange + 19, data, latestRange: lastRange + 20 };
}

export function useLoadItems(lastRange, totalCount) {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [latestRangeToFetch, setLatestRangeToFetch] = useState(lastRange);
  const [error, setError] = useState();

  async function loadMore() {
    setLoading(true);
    try {
      const { data:newData, hasNextPage: newHasNextPage, latestRange } = await loadIdeas(latestRangeToFetch, totalCount);
      setIdeas((data) => [...data, ...newData]);
      setHasNextPage(newHasNextPage);
      setLatestRangeToFetch(latestRange)
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  return { loading, ideas, hasNextPage, loadMore };
}
