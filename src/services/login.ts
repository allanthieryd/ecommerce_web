import { supabase } from "../utils/supabase"

export async function loginUser(email: string, password: string) {
  // Connexion via Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data?.user) {
    throw new Error("Utilisateur non trouvé ou mot de passe incorrect")
  }

  const user = data.user

  // Vérifier l'existence de l'utilisateur dans la table personnalisée `utilisateurs`
  const { data: userDetails, error: userError } = await supabase
    .from("utilisateurs")
    .select("id_utilisateur, email, role")
    .eq("id_utilisateur", user.id)
    .single()

  if (userError || !userDetails) {
    throw new Error(
      "Utilisateur non trouvé dans la base de données personnalisée",
    )
  }

  return {
    id: userDetails.id_utilisateur,
    email: userDetails.email,
    role: userDetails.role,
  }
}
