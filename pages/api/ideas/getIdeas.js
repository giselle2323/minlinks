import { supabase } from "../../../utils/supabase";

export const fetchArticlesIdeas = async (req, res) => {
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
  .range(0,5)
  
  if (error) return res.status(401).json({ error: error.message })
 return res.status(200).json(posts)
}