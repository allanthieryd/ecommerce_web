import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { supabase } from "../utils/supabase" // Assurez-vous que Supabase est correctement configuré

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Fonction de connexion avec l'email et le mot de passe
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw new Error(error.message)
      if (data?.user) {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Fonction de connexion avec GitHub
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    })
    if (error) {
      setError(error.message)
      return
    }

    // Vérifier la session après la connexion
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()
    if (sessionError) {
      setError(sessionError.message)
      return
    }

    // Si une session existe, rediriger
    if (sessionData?.session?.user) {
      router.push("/")
    } else {
      setError("Aucun utilisateur connecté.")
    }
  }

  return (
    <div className="flex justify-center text-slate-700">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Connexion</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <Button type="submit" variant="default" className="w-full mt-4">
          Connexion
        </Button>
        {/* Bouton de connexion avec GitHub */}
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handleGithubLogin}
          >
            Se connecter avec GitHub
          </Button>
        </div>
      </form>
    </div>
  )
}
