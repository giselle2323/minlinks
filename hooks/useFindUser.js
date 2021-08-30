import { supabase } from "../utils/supabase";
import { useQuery } from "react-query";


async function findUser (user) {

  const { data } = await supabase
  .from('users')
  .select(`
  id,
  email
  `)
  .filter('email', 'eq', user.email)
  .single()

  return {data, error};

};

const useFindUser = user => {
  return useQuery(['user', user], () => findUser(user))
}

export  {findUser, useFindUser};
