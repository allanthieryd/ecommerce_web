import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/utils/supabase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data: user } = await supabase.auth.getUser()

  if (user) {
    res.status(200).json({ loggedIn: true })
  } else {
    res.status(200).json({ loggedIn: false })
  }
}
