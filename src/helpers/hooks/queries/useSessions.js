import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { supabase } from "../../../utils/supabaseConfig";

export const useSessions = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['user'])
  const id = cookies.user?.id

  const query = useQuery(['sessions', id], () => {
    return supabase.rpc("get_total_sessions", {
      userid: id
    });
  })
  return query
}


export const useTotalCoins = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['user'])
  const id = cookies.user?.id

  const query = useQuery(['sessions', id], () => {
    return supabase.rpc("get_total_coins_spent", {
      userid: id
    });
  })
  return query
}