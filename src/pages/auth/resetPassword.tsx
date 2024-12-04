import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "@/utils/supabase"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { access_token } = router.query

      if (!access_token) {
        router.replace("/auth/login")
        return
      }

      const verifyToken = async () => {
        const { data, error } = await supabase.auth.getUser(
          access_token as string,
        )
        if (error || !data) {
          router.replace("/auth/login")
        }
      }
      verifyToken()
    }
  }, [router.isReady, router.query, router])

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/
    return passwordRegex.test(password)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    if (!validatePassword(password)) {
      setError(
        "Le mot de passe doit contenir au moins un caractère spécial et au moins 6 caractères.",
      )
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
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
            <div className="mb-4">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
