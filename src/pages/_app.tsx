import "../styles/globals.css"
import { AppProps } from "next/app"
import Header from "../components/header"
import Footer from "../components/footer"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-myprimary min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
