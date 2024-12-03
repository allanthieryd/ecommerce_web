/* eslint-disable max-lines-per-function */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "../../utils/supabase"

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Fonction pour envoyer un email de réinitialisation
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/resetPassword`,
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
        <h1 className="text-2xl mb-4 text-center">Mot de passe oublié</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success ? (
          <p className="text-green-500">
            Un email de réinitialisation de mot de passe a été envoyé.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <Button type="submit" variant="default" className="w-full mt-4">
              Envoyer un email de réinitialisation
            </Button>
          </>
        )}
      </form>
    </div>
  )
}
