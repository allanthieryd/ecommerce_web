/* eslint-disable no-console */
import React, { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import SearchBar from "./searchBar"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // État pour ouvrir/fermer le menu
  const menuRef = useRef<HTMLDivElement | null>(null) // Référence pour le menu

  const handleSearch = (value: string) => {
    console.log("Recherche :", value)
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev) // Alterner l'état du menu
  }

  const menuLinks = [
    { href: "/register", label: "S'inscrire" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
    { href: "/catalogue", label: "Nos services" },
  ]

  return (
    <header className="bg-mysecondary text-slate-800 py-4 shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="logo"
            width={1080}
            height={358}
            className="h-8 w-auto lg:h-10"
            style={{ objectFit: "contain" }}
          />
        </Link>

        <div className="md:flex-grow flex justify-evenly">
          <SearchBar
            placeholder="Rechercher un produit..."
            onSearch={handleSearch}
          />
        </div>

        {/* Menu en haut à droite */}
        <div className="relative">
          <div className="flex items-center space-x-4">
            {/* Icône de menu (hamburger) */}
            <FontAwesomeIcon
              icon={faBars}
              className="text-white cursor-pointer md:text-xl text-sm"
              onClick={toggleMenu} // Ouvrir/fermer le menu
            />

            {/* Menu déroulant */}
            <div
              ref={menuRef}
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute right-0 top-full mt-8 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-2 w-fit text-center`}
            >
              {menuLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button variant="ghost">{link.label}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
