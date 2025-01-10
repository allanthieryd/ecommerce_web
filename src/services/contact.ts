/* eslint-disable prettier/prettier */
import { supabase } from "../utils/supabase"

export async function contactMessage(
  email: string,
  nom: string,
  prenom: string,
  num: string,
  message: string,
) {
  // Vérification si le message est vide
  if (message.length < 1) {
    throw new Error("Le message est vide.")
  }
  // Vérification si le mail est vide
  if (email.length < 1) {
    throw new Error("L'email est vide.")
  }

  //verif si le mail est valide
  if (!email.includes("@")) {
    throw new Error("L'email n'est pas valide.")
  }

  const { error: insertError } = await supabase.from("contact").insert([
    {
      email,
      nom,
      prenom,
      num,
      message,
    },
  ])

  if (insertError) {
    throw new Error(insertError.message)
  }
  if (!insertError) {
    alert("Votre message a bien été envoyé.")
  }
  return true
}
