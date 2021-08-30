import { supabase } from '../utils/supabase'

export const fetchArticlesIdeas = async () => {
  const { data:posts, error, count} = await supabase
  .from('posts')
  .select(`
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
  `, { count: 'exact' })
  
  return {posts, count, error};
}
  
