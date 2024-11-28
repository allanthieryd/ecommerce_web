import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-mysecondary text-white py-4 shadow-md h-min">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Bloc central : CGU, Mentions légales, Contact */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center">
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

        {/* Logo LinkedIn à droite */}
        <div className="mt-4 md:mt-0">
          <Link href="https://www.linkedin.com/company/cyna-it" target="_blank">
            <Image
              src="/Linkedin_2021.svg.png"
              width={150}
              height={40}
              alt="LinkedIn"
            />
          </Link>
        </div>
      </div>

      {/* Texte en bas-centre */}
      <div className="text-center mt-4">
        <span className="text-sm text-slate-300">
          CYNA-IT SAS. © 2024 All rights reserved
        </span>
      </div>
    </footer>
  )
}
