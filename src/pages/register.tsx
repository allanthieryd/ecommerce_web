// /pages/register.tsx
import { useState } from "react"
import { registerUser } from "../services/register"
import { useRouter } from "next/router"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerUser(email, password, nom, prenom) // Fonction d'inscription
      router.push("/login") // Redirection après inscription
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen text-slate-700">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl mb-4">Inscription</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-black p-2 rounded"
        >
          S&apos;inscrire
        </button>
      </form>
    </div>
  )
}
