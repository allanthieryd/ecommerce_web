import { NextApiRequest, NextApiResponse } from "next"

// Exemple de gestion des erreurs
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    res.status(200).json({ status: "error logged" })
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
