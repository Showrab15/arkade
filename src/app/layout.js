import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"
import { ProductProvider } from "@/context/ProductContext"
import TopNavbar from "@/components/TopNavbar"
import BottomNavbar from "@/components/BottomNavbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Fashion Brand",
  description: "Premium clothing showcase",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        {/* Desktop Navbar */}
       <AuthProvider>
         <ProductProvider>
          <div className="hidden md:block">
          <TopNavbar />
        </div>

        <main className="pb-16 md:pb-0">
          {children}
        </main>
<Footer/>
        {/* Mobile Bottom Navbar */}
        <div className="md:hidden">
          <BottomNavbar />
        </div>
         </ProductProvider>
       </AuthProvider>
      </body>
    </html>
  )
}
