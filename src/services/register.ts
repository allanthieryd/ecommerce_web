import { supabase } from "../utils/supabase"

export async function registerUser(
  email: string,
  password: string,
  nom: string,
  prenom: string,
  role = "utilisateur",
) {
  // Création de l'utilisateur via Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  const user = data?.user

  if (!user) {
    throw new Error("Échec de la création de l'utilisateur")
  }

  // Ajouter des informations personnalisées dans la table `utilisateurs`
  const { error: insertError } = await supabase.from("utilisateurs").insert([
    {
      id_utilisateur: user.id,
      email,
      nom,
      prenom,
      role,
    },
  ])

  if (insertError) {
    throw new Error(insertError.message)
  }

  return user
}
