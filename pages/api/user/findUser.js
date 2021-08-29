import { supabase } from "../../../utils/supabase";

async function findAndCreateUser (req, res) {

  const { data } = await supabase
  .from('users')
  .select('email')
  .filter('email', 'eq', req.user.email);
  
  res.json(data);
  

};

export default findAndCreateUser;






