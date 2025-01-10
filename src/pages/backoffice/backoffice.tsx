/* eslint-disable prettier/prettier */
import React from "react"
import Link from "next/link"


const BACKOFFICE: React.FC = () => {
    
    const menuLinks =
    [
        { href: "/backoffice/contact", label: "Message Contact" },
        { href: "/orders", label: "Mes commandes" },
        { href: "/cgu", label: "CGU" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "À propos de Cyna" },
      ]


      return (
        <div className="flex flex-col items-center justify-center bg-[#8005ff] p-10 border-2 border-[#15ff1e] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center bg-[#7001fb] p-5 border-2 border-[#02ff1e] rounded-lg shadow-lg">
                {menuLinks.map((link, index) => (
                    <div key={index} className="w-full max-w-xs mb-4">
                        <Link href={link.href}>
                            <p className="block border-2 border-[#02ff1e] text-center py-2 px-4 bg-[#7001fb] text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-myprimary hover:text-[#02ff1e]">
                                {link.label}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
    export default BACKOFFICE
    