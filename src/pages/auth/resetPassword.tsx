import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../../utils/supabase"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { access_token } = router.query // Récupère le token de réinitialisation depuis l'URL

  useEffect(() => {
    if (!access_token) {
      setError("Aucun token trouvé. Veuillez essayer à nouveau.")
    }
  }, [access_token])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!access_token) {
      setError("Token de réinitialisation manquant.")
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password, // Le nouveau mot de passe
      })
      if (error) throw new Error(error.message)

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex justify-center text-slate-700">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl mb-4 text-center">
          Réinitialisation du mot de passe
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {success ? (
          <p className="text-green-500">
            Votre mot de passe a été réinitialisé avec succès.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <Button type="submit" variant="default" className="w-full mt-4">
              Réinitialiser le mot de passe
            </Button>
          </>
        )}
      </form>
    </div>
  )
}
