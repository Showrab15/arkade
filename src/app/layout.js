import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"
import { ProductProvider } from "@/context/ProductContext"
import TopNavbar from "@/components/TopNavbar"
import BottomNavbar from "@/components/BottomNavbar"
import Footer from "@/components/Footer"
import { Playfair_Display, Montserrat } from 'next/font/google';

export const metadata = {
  title: "Arkade",
  description: "For The Few",
}


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // choose the weights you need
  variable: '--font-playfair' // optional CSS variable
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background">
        {/* Desktop Navbar */}
        <AuthProvider>
          <ProductProvider>
            <div className="hidden md:block">
              {/* <TopNavbar /> */}
            </div>

            <main className="pb-16 md:pb-0">
              {children}
            </main>
            {/* <Footer /> */}
            {/* Mobile Bottom Navbar */}
            <div className="md:hidden">
              {/* <BottomNavbar /> */}
            </div>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
