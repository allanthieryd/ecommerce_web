/* eslint-disable max-lines-per-function */
import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { registerUser, registerWithGithub } from "@/services/register"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Fonction pour l'inscription avec email et mot de passe
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      const user = await registerUser(email, password, nom, prenom)
      if (user) {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  // Fonction pour l'inscription via GitHub
  const handleGithubRegister = async () => {
    try {
      const user = await registerWithGithub()
      if (user) {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex justify-center text-slate-700">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl mb-4">Inscription</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label>Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <Button type="submit" variant="default" className="w-full mt-4">
          S&apos;inscrire
        </Button>
        {/* Bouton pour l'inscription via GitHub */}
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handleGithubRegister}
          >
            S&apos;inscrire avec GitHub
          </Button>
        </div>
      </form>
    </div>
  )
}
