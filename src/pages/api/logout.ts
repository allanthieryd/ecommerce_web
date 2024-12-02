import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/utils/supabase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await supabase.auth.signOut()
    res.status(200).json({ message: "Déconnexion réussie" })
  } else {
    // Méthode HTTP non autorisée
    res.status(405).json({ error: "Méthode non autorisée" })
  }
}
