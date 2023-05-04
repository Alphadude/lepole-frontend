import { toast } from "react-toastify"
import { supabase } from "../../utils/supabaseConfig"


export const deductCoins = async (amount = 0) => {
  const { data: profileData, error: profileError } = await supabase.auth.getUser()
  console.log({ profileData, profileError });

  if (profileError) {
    toast.error('Unable to get balance. Try logging in again')
    return
  }

  const currentCoins = profileData?.user?.user_metadata?.wallet

  if (currentCoins < amount) {
    toast.error('You do not have sufficient coins in your wallet. Go to your wallet and purchase a coin bundle to book a session')
    return
  }

  const { data, error } = await supabase.auth.updateUser({ data: { wallet: currentCoins - amount } })
  console.log({ data, error });

  if (error) {
    toast.error('Unable to deduct from coin balance')
    return
  }

  return { data, error }
}