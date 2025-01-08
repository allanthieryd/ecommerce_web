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
  const buttonRef = useRef<HTMLButtonElement | null>(null) // Ref pour le bouton
  const router = useRouter()

  const isLogged = async () => {
    try {
      const res = await axios.get("/api/connection")
      const { loggedIn } = res.data
      setConnected(loggedIn)
    } catch (e) {
      if (e instanceof Error) {
        setConnected(false)
      }
    }
  }

  useEffect(() => {
    isLogged()

    const handleClickOutside = (event: MouseEvent) => {
      // Vérifie si le clic est en dehors du menu ET du bouton
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

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

  const handleLogout = async () => {
    await axios.post("/api/logout")
    setConnected(false)
    router.push("/")
  }

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
        { href: "/auth/login", label: "Se connecter" },
        { href: "/auth/register", label: "S'inscrire" },
        { href: "/cgu", label: "CGU" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "À propos de Cyna" },
      ]

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef} // Ajout de la ref pour le bouton
        className="text-white cursor-pointer md:text-xl ml-2"
        onClick={toggleMenu} // Utilise la fonction toggleMenu
      >
        ☰
      </button>
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-0 top-full mt-2 bg-white p-4 rounded-lg shadow-lg w-56 z-50`}
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
