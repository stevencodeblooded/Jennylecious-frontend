import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products";
import Layout from "./components/layout/Layout";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/auth/Login";
import AccountDashboard from "./pages/auth/AccountDashboard";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/auth/AdminDashboard";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<Home />} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App
