/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase" // Assurez-vous que Supabase est correctement configuré
import { Button } from "@/components/ui/button"

function Account() {
  const [userInfo, setUserInfo] = useState<any | null>(null)

  useEffect(() => {
    async function getUserInfo() {
      try {
        // Récupération de la session utilisateur
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession()

        if (sessionError || !sessionData.session) {
          console.error(
            "Erreur ou session utilisateur inexistante :",
            sessionError,
          )
          return
        }

        const userId = sessionData.session.user.id // Récupération de l'ID utilisateur

        // Récupération des données utilisateur
        const { data: user, error } = await supabase
          .from("utilisateurs")
          .select("nom, prenom, email") // Champs sélectionnés
          .eq("id_utilisateur", userId)
          .single() // Récupérer un seul utilisateur

        if (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error,
          )
          return
        }

        setUserInfo(user)
      } catch (error) {
        console.error("Une erreur inattendue s'est produite :", error)
      }
    }

    getUserInfo()
  }, [])

  return (
    <main>
      <div className="container mx-auto bg-mysecondary shadow-md rounded-lg px-12 py-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Mon Compte</h1>
        {userInfo ? (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-lg" htmlFor="nom">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                value={userInfo.nom}
                readOnly
                className="p-2 border rounded-md bg-gray-100 text-black"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-lg" htmlFor="prenom">
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                value={userInfo.prenom}
                readOnly
                className="p-2 border rounded-md bg-gray-100 text-black"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-lg" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={userInfo.email}
                readOnly
                className="p-2 border rounded-md bg-gray-100 text-black"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-white">
            Aucune information utilisateur trouvée.
          </p>
        )}

        <Button variant="default" className="w-full mt-4">
          Modifier mes informations
        </Button>
      </div>
    </main>
  )
}

export default Account
