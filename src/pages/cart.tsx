/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<any | null>(null)
  const [discount, setDiscount] = useState<number>(0)
  const [promoCode, setPromoCode] = useState<string>("")

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession()

        if (sessionError || !sessionData.session) {
          console.error(
            "Erreur ou session utilisateur inexistante :",
            sessionError,
          )
          return
        }

        const userId = sessionData.session.user.id // Récupération de l'ID utilisateur

        const { data: user, error } = await supabase
          .from("utilisateurs")
          .select("nom, prenom, email") // Champs sélectionnés
          .eq("id_utilisateur", userId)
          .single() // Récupérer un seul utilisateur

        if (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error,
          )
          return
        }

        setUserInfo(user)
      } catch (error) {
        console.error("Une erreur inattendue s'est produite :", error)
      }
    }

    getUserInfo()
  }, [])

  useEffect(() => {
    async function getCartItems() {
      if (!userInfo) return // Attendre que les données utilisateur soient disponibles

      const { data: cart, error } = await supabase
        .from("panier")
        .select(`id_article, quantite, prix_unitaire, nom`)

      if (error) {
        console.error(
          "Erreur lors de la récupération des produits du panier :",
          error,
        )
        setError("Erreur lors de la récupération des produits.")
        return
      }

      if (cart) {
        const formattedCart = cart.map((item) => ({
          id_article: item.id_article,
          nom: item.nom, // Accès au nom du produit via la jointure
          quantite: item.quantite,
          prix_unitaire: item.prix_unitaire,
        }))
        setCartItems(formattedCart)
      }
    }

    getCartItems()
  }, [userInfo])

  const handleQuantityChange = (id_article: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id_article === id_article
          ? { ...item, quantite: newQuantity }
          : item,
      ),
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id_article !== id),
    )
  }

  const handleApplyPromoCode = () => {
    if (promoCode === "PROMO10") {
      setDiscount(0.1) // Applique une remise de 10% pour ce code promo
      setError(null)
    } else {
      setError("Code promo invalide")
      setDiscount(0)
    }
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantite * item.prix_unitaire,
    0,
  )

  const discountedPrice = totalPrice * (1 - discount)

  return (
    <main>
      <h1 className="text-4xl font-bold text-white mb-8">Votre Panier</h1>
      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md flex">
        <div className="w-3/4">
          {error && <p className="text-red-500 mb-6">{error}</p>}
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Votre panier est vide.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id_article}
                  className="flex items-center justify-between bg-gray-100 p-6 mb-6 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-6 w-2/3">
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold text-gray-800">
                        {item.nom}
                      </p>
                      <p className="text-sm text-gray-500">
                        Prix unitaire : {item.prix_unitaire}€
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 w-1/3 justify-end">
                    <input
                      id={`quantity-${item.id_article}`}
                      type="number"
                      value={item.quantite}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id_article,
                          parseInt(e.target.value),
                        )
                      }
                      className="w-24 p-2 border rounded-lg text-center text-gray-600"
                    />
                    <p className="font-semibold text-gray-800">
                      {(item.quantite * item.prix_unitaire).toFixed(2)}€
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id_article)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-2xl font-semibold text-gray-800 w-full text-right">
                {discount > 0
                  ? discountedPrice.toFixed(2)
                  : totalPrice.toFixed(2)}{" "}
                €
              </p>
              <Link href="/orders" passHref>
                <Button className="w-full mt-4">Commander</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Code Promo */}
        <div className="w-1/3 ml-8 bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            J&apos;ai un code promo
          </h2>
          <input
            type="text"
            placeholder="Entrez votre code promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 text-sm text-gray-600"
          />
          <Button
            onClick={handleApplyPromoCode}
            className="w-full px-6 py-2 bg-ctaButton text-white rounded-lg shadow-md hover:bg-ctaButton2 focus:outline-none focus:ring-2 focus:ring-neutral-200"
          >
            Appliquer
          </Button>
          {discount > 0 && (
            <p className="mt-4 text-green-600">
              Remise: -{discount * 100}% ({(totalPrice * discount).toFixed(2)}€)
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Cart
