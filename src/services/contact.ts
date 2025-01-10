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

    return true

}