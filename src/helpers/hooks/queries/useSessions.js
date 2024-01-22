import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';
import { supabase } from '../../../utils/supabaseConfig';

export const useSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const dateString = new Date().toISOString().substring(0, 10);

  const query = useQuery(['sessions', id], () => {
    return supabase
      .from('session')
      .select('*')
      .eq('user_id', id)
      .eq('date', dateString)
      .order('created_at', { ascending: false });
  });
  return query;
};

export const useSessionsHistory = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const dateString = new Date().toISOString();

  const query = useQuery(['sessions-history', id], () => {
    return supabase
      .from('session')
      .select('*')
      .eq('user_id', id)
      .lte('endTime', dateString)
      .order('created_at', { ascending: false });
  });
  return query;
};

export const useActiveSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;

  const query = useQuery(['active-sessions', id], () => {
    return supabase
      .rpc('get_active_sessions', {
        userid: id,
      })
      .order('created_at', { ascending: false });
  });
  return query;
};

export const useUpcomingSessions = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;
  const date = new Date();
  const dateString = date.toISOString();

  const query = useQuery(['upcoming-sessions', id], () => {
    return supabase
      .from('session')
      .select('*')
      .eq('user_id', id)
      .eq('isCancelled', false)
      .gte('startTime', dateString)
      .order('startTime', { ascending: true });
  });
  return query;
};

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
    return supabase.auth.getUser();
  });
  return query;
};

export const useGetCancelRequest = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user?.id;

  const query = useQuery(['cancel-session', id], () => {
    return supabase
      .from('cancellations')
      .select(
        `
        *,
        session:session_id(*)
      `,
      )
      .eq('user_id', id);
  });
  return query;
};
