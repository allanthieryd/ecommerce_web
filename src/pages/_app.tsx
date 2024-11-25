import "../styles/globals.css"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-purple-700 flex items-center justify-center h-screen">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
