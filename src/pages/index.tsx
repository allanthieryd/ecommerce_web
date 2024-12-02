/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase" // Assurez-vous que Supabase est correctement configuré

function Page() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function getProducts() {
      const { data: products, error } = await supabase
        .from("produits")
        .select("nom, description")

      if (error) {
        console.error("Error fetching data:", error)
        return
      }

      if (products) {
        setProducts(products)
      }
    }

    getProducts()
  }, [])

  return (
    <main>
      <div className="p-8 text-black rounded-xl w-full max-w-screen-lg">
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-full md:w-1/4 bg-gray-100 p-6 rounded-md shadow-md"
            >
              <h1 className="text-xl font-bold text-center mb-2">
                {product.nom}
              </h1>
              <p className="text-center text-gray-700">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Page
