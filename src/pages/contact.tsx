import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";
import { Container } from "postcss";

const CONTACT: React.FC = () => {
  return (
    <>
      <main>
        <h1 className="text-4xl font-bold mb-6 text-center">
            <span className="text-4xl font-bold mb-6 text-center">Formulaire de </span>
            <span className="text-4xl font-bold mb-6 text-center text-[#02ff1e]">Contact</span>
        </h1>
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg px-8 py-6">
            <form className="flex flex-col">
                <label className="text-violet-700 pt-6 font-bold" htmlFor="name">Nom *</label>
                <input
                type="text"
                id="name"
                name="name"
                className="border p-2 rounded bg-violet-100"
                />
                <label className="text-violet-700 pt-6 font-bold" htmlFor="firstname">Prénom *</label>
                <input
                type="text"
                id="firstname"
                name="firstname"
                className="border p-2 rounded bg-violet-100"
                />
                <label className="text-violet-700 pt-6 font-bold" htmlFor="email">E-mail *</label>
                <input
                type="email"
                id="email"
                name="email"
                className="border p-2 rounded bg-violet-100"
                />
                <label className="text-violet-700 pt-6 font-bold" htmlFor="phone">Numéro de téléphone</label>
                <input
                type="tel"
                id="phone"
                name="phone"
                className="border p-2 rounded bg-violet-100"
                />
                <label className="text-violet-700 pt-6 font-bold" htmlFor="message">Message</label>
                <textarea
                id="message"
                name="message"
                className="border p-2 rounded bg-violet-100"
                />
                <button type="submit" className="bg-violet-500 text-white font-bold p-2 rounded-full mt-4 w-1/3 mx-auto">
                Envoyer
                </button>
            </form>
        </div>
      </main>
    </>
  );
};

export default CONTACT;