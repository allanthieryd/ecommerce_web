import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-mysecondary text-white py-4 shadow-md h-min">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Bloc CGU, Mentions légales, Contact */}
        <div className="flex flex-row space-x-6 text-center md:text-left">
          <Link href="/cgu">
            <span className="text-sm hover:underline cursor-pointer">CGU</span>
          </Link>
          <Link href="/mentions-legales">
            <span className="text-sm hover:underline cursor-pointer">
              Mentions légales
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-sm hover:underline cursor-pointer">
              Contact
            </span>
          </Link>
        </div>

        {/* Texte copyright en bas */}
        <div className="mt-2 text-center text-sm text-slate-100">
          CYNA-IT SAS. © 2024 All rights reserved
        </div>

        {/* Logo LinkedIn - Aligné au centre */}
        <div className="mt-2">
          <Link href="https://www.linkedin.com/company/cyna-it" target="_blank">
            <Image
              src="/LinkedIn.png"
              width={150}
              height={40}
              alt="LinkedIn"
              className="md:w-36 md:h-auto w-20 h-auto object-contain"
              priority
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
