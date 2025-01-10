/* eslint-disable no-console */
import React from "react"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./searchBar"
import Basket from "./basket"
import Menu from "./menu"

const Header = () => {
  const handleSearch = (value: string) => {
    console.log("Recherche :", value)
  }

  return (
    <header className="bg-mysecondary text-slate-800 py-4 shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="logo"
            priority
            width={1080}
            height={358}
            className="hidden md:block h-6 md:h-8 lg:h-10 w-auto object-contain"
          />
          <Image
            className="md:hidden h-12 w-auto left-0"
            src="/logo-r.png"
            alt="logo"
            priority
            height={358}
            width={1080}
          />
        </Link>

        <div className="md:flex-grow flex md:justify-evenly">
          <SearchBar
            placeholder="Rechercher un produit..."
            onSearch={handleSearch}
          />
        </div>
        <div className="flex items-center space-x-1 sm:space-x-4 lg:space-x-8">
          <Basket />
          <Menu />
        </div>
      </div>
    </header>
  )
}

export default Header
