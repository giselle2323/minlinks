import { supabase } from '../utils/supabase'

export const fetchArticlesIdeas = async () => {
  const { data:posts, error } = await supabase
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
  
  if(error) {
    throw new Error(error.message)
  }

  return posts;
}
  
