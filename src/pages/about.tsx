import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";

const ABOUT: React.FC = () => {
  return (
    <>
      <main>
        {/*mission*/}
        <div className="container mx-auto p-4 px-8 py-6">
            <h1 className="text-6xl font-bold mb-6 text-center pt-10">Notre Mission</h1>
            {/*image C:\Users\tibou\Ecole\ecommerce_web\public\about_img\qui sommes nous vert.avif*/}
            <img 
                src="\about_img\qui_sommes_nous_vert.avif"
                className="w-300 h-300 mx-auto"
            />
            <p className="text-2xl mb-6 text-center">
                <span>Fondée en 2021, </span>
                <span className="font-bold">CYNA </span>
                <span>est née après la réalisation de nombreuses </span>
                <span className="font-bold">réponses à incident </span>
                <span>sur le territoire</span>
                <span className="font-bold">Français </span>
                <span>et </span>
                <span className="font-bold">Européen </span>
                <span>grâce à une expertise reconnue des fondateurs </span>
                <span className="font-bold">Nathan BRAMLI, Enguerrand GRANOUX </span>
                <span>et </span>
                <span className="font-bold">Alexandre EL BAZ.</span>
            </p>
            <p className="text-2xl mb-6 text-center">
                <span>Cette expérience importante leur a permis de voir </span>
                <span className="font-bold">les différents vecteurs d’attaques, les scénarios qu’utilisaient les attaquant, </span>
                <span>c'est pour cela qu'ils ont décidé de créer </span>
                <span className="font-bold">CYNA </span>  
                <span>avec </span>
                <span className="font-bold">une approche globale </span>
                <span>pour offrir </span>
                <span className="font-bold">une protection pragmatique </span>
                <span>contre les cyberattaques.</span>
            </p>
        </div>
        {/* trai de transition*/}
        <div className="container bg-[#02ff1e] mx-auto w-1/3 h-1 m-3"></div>
        {/*defis*/}
        <div className="container mx-auto p-4 px-8 py-6 ">
            <h1 className="text-4xl font-bold mb-6 text-center">Les Défis</h1>
            <article>
                <section className="container mx-auto p-4 px-8 py-6 flex ">
                    <img 
                        src="\about_img\Loupe.avif"
                        className="w-300 h-300 mx-auto self-start p-3"
                    />
                    {/*image*/}
                    <p className="text-2xl mb-6 text-center">
                        <span>À travers cette expérience, nous avons rapidement</span>
                        <span className="font-bold text-[#02ff1e]">identifié les défis auxquels sont confrontées les PME & ETI</span>
                        <span>, souvent vulnérables aux cyberattaques en raison de ressources limitées,  manque d’expertise et d'une sensibilisation insuffisante.</span>
                    </p>
                </section >
                <section className="container mx-auto p-4 px-8 py-6 flex">
                    <img 
                        src="\about_img\cible.avif"
                        className="w-300 h-300 mx-auto self-start p-3"
                    />
                    {/*image*/}
                    <p className="text-2xl mb-6 text-center">
                        <span>De même, </span>
                        <span className="font-bold text-[#02ff1e]">les institutions publiques et privées </span>
                        <span>sont devenus des </span>
                        <span className="font-bold text-[#02ff1e]">cibles privilégiées </span>
                        <span>pour les cybercriminels, en raison de la valeur des données qu'elles détiennent.</span>
                    </p>
                </section>
            </article>  
        </div>
        {/* trai de transition*/}
        <div className="container bg-[#02ff1e] mx-auto w-1/3 h-1 m-3"></div>
        {/*engagements*/}
        <div className="container mx-auto p-4 px-8 py-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Nos Engagements</h1>
            <article className="flex">
            <section className="container mx-auto p-4 px-8 py-6">
            <img 
                        src="\about_img\solution.avif"
                        className="w-250 h-250 mx-auto"
                    />
            </section>
            <section className="container mx-auto p-4 px-8 py-6">
            <img 
                        src="\about_img\protection.avif"
                        className="w-250 h-250 mx-auto"
                    />
            </section>
            <section className="container mx-auto p-4 px-8 py-6">
            <img 
                        src="\about_img\accompagne.avif"
                        className="w-250 h-250 mx-auto"
                    />
            </section>
            </article>
            <article className="flex">
                <section className="container mx-auto p-4 px-8 py-6">

                    <p className="mb-6 text-center">
                        <span>Fournir des </span>
                        <span className="font-bold">solutions de cybersécurité efficaces </span>
                        <span>et </span>
                        <span className="font-bold">accessibles</span>
                        <span>, spécialement conçues pour répondre aux besoins uniques des </span>
                        <span className="font-bold">PME & ETI.</span>
                    </p>
                </section>
                <section className="container mx-auto p-4 px-8 py-6">

                    <p className="mb-6 text-center">
                        <span className="font-bold">Protéger </span>
                        <span>vos données sensibles et </span>
                        <span className="font-bold">garantir la continuité de vos opérations </span>
                        <span>dans un environnement numérique de plus en plus complexe et menaçant.</span>
                    </p>
                </section>
                <section className="container mx-auto p-4 px-8 py-6">
                    <p className="mb-6 text-center">
                       
                        <span className="font-bold">Accompagner nos clients </span>
                        <span>dans leur parcours vers une </span>
                        <span className="font-bold">cybersécurité renforcée, </span>
                        <span>avec une </span>
                        <span className="font-bold">équipe d'experts </span>
                        <span>engagée et investie.</span>
                    </p>

                </section>

            </article>

        </div>
        {/* trai de transition*/}
        <div className="container bg-[#02ff1e] mx-auto w-1/3 h-1 m-3"></div>
        {/*text final*/}
        <div className=" mx-auto p-4 px-8 py-6">
            <p className="text-4xl font-bold mb-6 text-center">
                <span>Chez Cyna, nous avons des </span>
                <span className="text-[#02ff1e]">solutions adaptées </span>
                <span>à votre taille et à votre budget, parce que la sécurité ne devrait pas être un luxe.</span>
            </p>
        </div>
      </main>
    </>
  );
};

export default ABOUT;