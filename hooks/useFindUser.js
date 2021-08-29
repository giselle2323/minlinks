import { supabase } from "../utils/supabase";
import { useQuery } from "react-query";


async function findUser (user) {

  const { data } = await supabase
  .from('users')
  .select('email')
  .filter('email', 'eq', req.user.email);
  
  if(error) {
    throw new Error(error.message)
  }

  return data;

};

const useFindUser = user => {
  return useQuery(['user', user], () => fetchPosts(user))
}

export  {findUser, useFindUser};




