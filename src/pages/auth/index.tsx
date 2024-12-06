import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

export default function AuthIndex() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/auth/login")
  }, [router])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <p>Redirection en cours...</p>
    </>
  )
}
