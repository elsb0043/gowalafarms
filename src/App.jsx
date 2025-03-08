import { useLocation, useRoutes } from "react-router-dom"
import { useAuthContext } from "./context/useAuthContext"
import { BackofficeEmployees, BackofficeProducts } from "./pages/Backoffice/BackofficeItems"
import Navigation from "./components/Navigation/Navigation"
import HomePage from "./pages/Home"
import ShopPage from "./pages/Shop"
import ServicesPage from "./pages/Services"
import AboutPage from "./pages/About"
import ContactPage from "./pages/Contact"
import CheckoutPage from "./pages/Checkout"
import Footer from "./components/Footer/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import Backoffice from "./pages/Backoffice/Backoffice"
import Login from "./components/BackofficePage/Login/Login"
import ProductForm from "./pages/Backoffice/Forms/ProductForm"
import EmployeesForm from "./pages/Backoffice/Forms/EmployeeForm"

function App() {
  // Henter authentication state via custom hook useAuth
  const { signedIn } = useAuthContext()

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
      path: "/login", 
      element: <Login />
    },
    { 
      path: "/backoffice", 
      element: (
        <ProtectedRoute isAllowed={signedIn}>
            <Backoffice /> {/* Backoffice komponent, beskyttet af login */}
        </ProtectedRoute>
      ),
      children: [
        {
          path: "products", 
          element: <BackofficeProducts />, // Produkt oversigt i backoffice
          children: [
            {
              path: "add", // Rute til at tilføje et nyt produkt
              element: <ProductForm />,
            },
            {
              path: "edit/:id", // Rute til at redigere et produkt baseret på ID
              element: <ProductForm isEditMode={true} />,
            },
          ],
        },
        {
          path: "employees", 
          element: <BackofficeEmployees />,
          children: [
            {
              path: "add",
              element: <EmployeesForm />,
            },
            {
              path: "edit/:id", 
              element: <EmployeesForm isEditMode={true} />,
            },
          ],
        },
      ],
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