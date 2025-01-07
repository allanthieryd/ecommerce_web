import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";

const MENTIONS_LEGALES: React.FC = () => {
  return (
    <>
      <main>
        <h1 className="text-4xl font-bold mb-6 text-center">Mentions Légales</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-lg leading-relaxed">Bienvenue sur notre site. En utilisant ce site, vous acceptez les conditions générales d'utilisation suivantes...</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation du Site</h2>
          <p className="text-lg leading-relaxed">Vous vous engagez à utiliser ce site de manière légale et respectueuse...</p>
        </section>
        {/* Ajoutez d'autres sections nécessaires pour vos CGU */}
      </main>
    </>
  );
};

export default MENTIONS_LEGALES;