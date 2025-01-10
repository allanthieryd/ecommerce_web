import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { supabase } from "@/utils/supabase"

const Basket = () => {
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    const fetchCartData = async () => {
      const { data: cart } = await supabase.from("panier").select("quantite")

      const totalItems =
        cart?.reduce((total, item) => total + item.quantite, 0) || 0
      setProductCount(totalItems)
    }

    fetchCartData()
  }, [])

  return (
    <div className="relative">
      <Link href="/cart">
        <FontAwesomeIcon
          icon={faBagShopping}
          size="lg"
          className="text-white text-[16px] md:text-[24px]"
        />
      </Link>
      {productCount > 0 && (
        <span className="absolute -top-4 md:-top-6 -right-3 md:-right-5 bg-black text-white text-[8px] md:text-[12px] rounded-full px-2 md:px-2.5 py-1">
          {productCount}
        </span>
      )}
    </div>
  )
}

export default Basket
