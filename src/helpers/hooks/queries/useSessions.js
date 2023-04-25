import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';
import { supabase } from '../../../utils/supabaseConfig';

export const useSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const dateString = new Date().toISOString().substring(0, 10);

  const query = useQuery(['sessions', id], () => {
    return supabase
      .from("session")
      .select("*")
      .eq("user_id", id)
      .eq("date", dateString);
  });
  return query;
};


export const useActiveSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const date = new Date();
  const currentTime = date.toISOString().substring(0, 10);
  const end = new Date(date.setHours(date.getHours() + 4));
  const endTime = end.toISOString().substring(0, 10);


  const query = useQuery(['active-sessions', id], () => {
    return supabase
      .from("session")
      .select("*")
      .eq("user_id", id)
      .gte("startTime", currentTime)
      .lte("endTime", endTime);
  })
  return query
}


export const useUpcomingSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const date = new Date(Date.now());
  const dateString = date.toISOString().substring(0, 10);

  const query = useQuery(['upcoming-sessions', id], () => {
    return supabase
      .from("session")
      .select("*")
      .eq("user_id", id)
      .gte("date", dateString);
  })
  return query
}


export const useTotalSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;

  const query = useQuery(['sessions', id], () => {
    return supabase.rpc('get_total_sessions', {
      userid: id,
    });
  });
  return query;
};

export const useTotalCoins = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;

  const query = useQuery(['total-coin', id], () => {
    return supabase.rpc('get_total_coins_spent', {
      userid: id,
    });
  });
  return query;
};
