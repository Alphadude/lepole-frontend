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

export const useSessionsHistory = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const dateString = new Date().toISOString();

  const query = useQuery(['sessions-history', id], () => {
    return supabase
      .from("session")
      .select("*")
      .eq("user_id", "c753c13c-4218-4e44-9420-7c90be48cf0d")
      .lte("startTime", dateString);
  });
  return query;
};


export const useActiveSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;

  const query = useQuery(['active-sessions', id], () => {
    return supabase
      .rpc("get_active_sessions", {
        userid: id,
      });

  })
  return query
}


export const useUpcomingSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const date = new Date();
  const dateString = date.toISOString();

  const query = useQuery(['upcoming-sessions', id], () => {
    return supabase
      .from("session")
      .select("*")
      .eq("user_id", id)
      .gte("startTime", dateString);
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

  const query = useQuery(['total-coins-spent', id], () => {
    return supabase.rpc('get_total_coins_spent', {
      userid: id,
    });
  });
  return query;
};


export const useProfile = () => {
  const query = useQuery('profile', () => {
    return supabase.auth.getUser()
  });
  return query;
};
