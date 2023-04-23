import { useMutation, useQuery } from 'react-query';
import { supabase } from '../../../utils/supabaseConfig';

import { useCookies } from 'react-cookie';

export const useTransactions = () => {
  const [cookies] = useCookies(['user']);
  const userId = cookies?.user?.id;

  const query = useQuery(['transactions', userId], () => {
    return supabase
     .from("transactions")
     .select("*")
     .eq("user_id", userId);
  });
  return query;
};