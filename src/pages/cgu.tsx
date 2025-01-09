import React, { useState, useEffect } from "react"
import CGUTextBox from "../components/CGU/CGUTextBox" // Import direct avec ?raw (Vite spécifique)

const CGU = () => {
  return (
    <main className=" w-5/6 flex items-center justify-center">
      <CGUTextBox />
    </main>
  )
}

export default CGU
