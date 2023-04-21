import { useMutation, useQuery } from 'react-query';
import { supabase } from '../../../utils/supabaseConfig';

import { useCookies } from 'react-cookie';

export const useGetNotifications = () => {
  const [cookies] = useCookies(['user']);
  const userId = cookies?.user?.id;

  const query = useQuery(['notifications', userId], () => {
    return supabase.from('notifications').select('*').eq('user_id', userId);
  });
  return query;
};

export const useReadNotifications = () => {
  const response = useMutation(
    async (id) =>
      await supabase
        .from('notifications')
        .update({ isRead: true })
        .select()
        .eq('id', id),
  );

  return response;
};

// export const readNotifications = async ({ id }) => {
//   try {
//     const response = await supabase
//       .from('notifications')
//       .update({ isRead: true })
//       .select()
//       .eq('id', id);

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
