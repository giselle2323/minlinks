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
    users:authorId(id, name)
  `)
  
  if(error) {
    throw new Error(error.message)
  }

  return posts;
}
  
