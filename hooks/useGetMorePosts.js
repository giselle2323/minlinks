export const getMoreArticles = async (rangeStart, rangeStop) => {
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
    .range(rangeStart, rangeStop)
    
    if(error) {
      throw new Error(error.message)
    }
  
    return data;
  }