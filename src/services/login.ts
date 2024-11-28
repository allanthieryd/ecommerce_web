import { supabase } from "../utils/supabase"

export async function loginUser(email: string, password: string) {
  // Connexion via Supabase Auth
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  const user = data?.user

  if (!user) {
    throw new Error("Confirmer votre adresse email pour vous connecter")
  }

  // Vérifier l'existence de l'utilisateur dans la table personnalisée `utilisateurs`
  const { data: userDetails, error: userError } = await supabase
    .from("utilisateurs")
    .select("id_utilisateur, email, role")
    .eq("id_utilisateur", user.id)
    .single()

  // Gestion d'une erreur si l'utilisateur n'est pas trouvé dans la table personnalisée
  if (userError || !userDetails) {
    throw new Error("Utilisateur non trouvé dans la base de données")
  }

  return {
    id: userDetails.id_utilisateur,
    email: userDetails.email,
    role: userDetails.role,
  }
}
