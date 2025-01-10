/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react"
import { supabase } from "../../utils/supabase" // Assurez-vous que Supabase est correctement configuré

function Page() {
  const [contacts, setContacts] = useState<any[]>([])

  useEffect(() => {
    async function getContacts() {
      const { data: contacts, error } = await supabase
        .from("contact")
        .select("message, nom, prenom, email, num")

      if (error) {
        alert("Erreur lors de la récupération des contacts.")
        return
      }

      if (contacts) {
        setContacts(contacts)
      }
    }

    getContacts()
  }, [])

  return (
    <main>
      <div className="p-8 text-black rounded-xl w-full max-w-screen-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Gestion des Contacts</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Nom</th>
              <th className="border border-gray-200 px-4 py-2">Prénom</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Numéro</th>
              <th className="border border-gray-200 px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{contact.nom}</td>
                <td className="border border-gray-200 px-4 py-2">{contact.prenom}</td>
                <td className="border border-gray-200 px-4 py-2">{contact.email}</td>
                <td className="border border-gray-200 px-4 py-2">{contact.num}</td>
                <td className="border border-gray-200 px-4 py-2">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
    )
}

export default Page
