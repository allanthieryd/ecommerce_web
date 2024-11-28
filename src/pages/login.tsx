import { useState } from "react"
import { loginUser } from "../services/login"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await loginUser(email, password)
      if (user) {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen text-slate-700">
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
      </form>
    </div>
  )
}
