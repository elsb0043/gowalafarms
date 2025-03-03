import { useLocation, useRoutes } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import HomePage from "./pages/Home"
import ShopPage from "./pages/Shop"
import ServicesPage from "./pages/Services"
import AboutPage from "./pages/About"
import ContactPage from "./pages/Contact"
import CheckoutPage from "./pages/Checkout"
import Footer from "./components/Footer/Footer"

function App() {
  const location = useLocation() // Bruges til at hente den nuværende URL (path)
  
  // Bestemmer om navigationen og footer skal vises baseret på URL'en
  const isNav = ["/", "/shop", "/services", "/about", "/contact", "/checkout"].includes(location.pathname)
  const isFooter = ["/", "/shop", "/services", "/about", "/contact", "/checkout"].includes(location.pathname)

  // Definerer ruterne i appen
  const routes = useRoutes([
    { 
      path: "/", 
      element: <HomePage />
    },
    { 
      path: "/shop", 
      element: <ShopPage />
    },
    { 
      path: "/services", 
      element: <ServicesPage />,
    },
    { 
      path: "/about", 
      element: <AboutPage />
    },
    { 
      path: "/contact", 
      element: <ContactPage />
    },
    { 
      path: "/checkout", 
      element: <CheckoutPage />
    },
    {
      path: "*", // Fallback rute, hvis ingen af de øvrige ruter matches
      element : <div>NOT FOUND</div> // Vis en fejlmeddelelse, hvis ingen rute findes
    },
  ])

  return (
    <>
      {/* Viser navigation kun på bestemte sider */}
      {isNav && <Navigation />}
      <div>{routes}</div>
      {/* Viser footer kun på bestemte sider */}
      {isFooter && <Footer />}
    </>
  )
}

export default App