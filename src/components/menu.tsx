/* eslint-disable max-lines-per-function */
import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import axios from "axios"

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  // Fonction pour vérifier si l'utilisateur est connecté
  const isLogged = async () => {
    try {
      const res = await axios.get("/api/connection")
      const { loggedIn } = res.data
      setConnected(loggedIn)
    } catch (error: unknown) {
      if (error instanceof Error) {
        await axios.post("/api/logError", {
          message: "User is not logged in",
          error: error.message,
        })
      } else {
        await axios.post("/api/logError", {
          message: "User is not logged in",
          error: "Unknown error occurred",
        })
      }
      setConnected(false)
    }
  }

  useEffect(() => {
    isLogged()

    const handleClickOutside = (event: MouseEvent) => {
      // Si le clic se fait à l'extérieur du menu et du bouton, on ferme le menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    // Ajout de l'écouteur d'événements pour détecter le clic à l'extérieur
    document.addEventListener("mousedown", handleClickOutside)

    // Nettoyage de l'événement lors du démontage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false)
    }
    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router])

  // Fonction de déconnexion
  const handleLogout = async () => {
    await axios.post("/api/logout")
    setConnected(false)
    router.push("/")
  }

  // Menu basé sur l'état de connexion
  const menuLinks = connected
    ? [
        { href: "/profile", label: "Mes paramètres" },
        { href: "/orders", label: "Mes commandes" },
        { href: "/cgu", label: "CGU" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "À propos de Cyna" },
        { label: "Se déconnecter", action: handleLogout },
      ]
    : [
        { href: "/login", label: "Se connecter" },
        { href: "/register", label: "S'inscrire" },
        { href: "/cgu", label: "CGU" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "À propos de Cyna" },
      ]

  // Fonction pour basculer l'état du menu (ouvrir ou fermer)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <button
        className="text-white cursor-pointer md:text-xl ml-2"
        onClick={toggleMenu} // Utilise la fonction toggleMenu
      >
        ☰
      </button>
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-0 top-full mt-2 bg-white p-4 rounded-lg shadow-lg w-56`}
      >
        {menuLinks.map((link, index) =>
          link.action ? (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left hover:bg-gray-200"
              onClick={link.action}
            >
              {link.label}
            </Button>
          ) : (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className="w-full text-left hover:bg-gray-200"
              >
                {link.label}
              </Button>
            </Link>
          ),
        )}
      </div>
    </div>
  )
}

export default Menu
