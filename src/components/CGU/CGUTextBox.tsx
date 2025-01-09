import React, { useState, useEffect } from "react"

const CGUTextBox = () => {
  const [cguContent, setCguContent] = useState("")

  useEffect(() => {
    fetch("/CGU.txt") // Attention : Chemin relatif depuis le dossier public
      .then((response) => {
        if (!response.ok) {
          throw new Error("Le fichier CGU.txt est introuvable.")
        }
        return response.text()
      })
      .then((text) => setCguContent(text))
      .catch((error) => console.error("Erreur de chargement :", error))
  }, [])

  return (
    <div className="container mx-auto py-10 px-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Conditions Générales d'Utilisation
      </h1>
      <textarea
        value={cguContent}
        readOnly
        className="h-[800px] bg-myprimary w-full border border-gray-300 rounded-lg p-4 text-sm text-justify resize-none "
      />
    </div>
  )
}

export default CGUTextBox
