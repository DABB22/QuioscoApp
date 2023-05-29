import { QuioscoProvider } from '../context/QuioscoProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
    )
}

export default MyApp

/*
  * Proyecto full-stack vamos a usar
  * Nextjs
  * Tailwindcss
  * Prisma para la base de datos.
  * SWR - consultas en tiempo real

*/