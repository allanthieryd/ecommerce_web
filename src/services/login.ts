import { supabase } from "../utils/supabase"

export async function loginUser(email: string, password: string) {
  // Connexion via Supabase Auth
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  const user = data?.user

  // Vérifier si l'utilisateur existe
  if (!user) {
    throw new Error("Utilisateur ou mot de passe incorrect.")
  }

  // Vérifier si l'email a été confirmé
  if (!user.email_confirmed_at) {
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
    throw new Error("Utilisateur non trouvé dans la base de données.")
  }

  return {
    id: userDetails.id_utilisateur,
    email: userDetails.email,
    role: userDetails.role,
  }
}

export const loginWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  })
  if (error) throw new Error(error.message)

  // Récupérez la session après la connexion OAuth
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()
  if (sessionError) throw new Error(sessionError.message)

  // Vérifiez que l'utilisateur est connecté
  if (sessionData?.session?.user) {
    return sessionData.session.user
  } else {
    throw new Error("Erreur lors de la connexion via GitHub.")
  }
}
