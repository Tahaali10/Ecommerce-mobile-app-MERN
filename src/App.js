import {
  createBrowserRouter,
  RouterProvider,
  Route,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import FooterTop from "./components/home/Footer/FooterTop";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Dashboard from "./pages/Dashboard/Dashboard";
import CategoryProducts from './components/home/PopularProducts/CategoryProducts';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FastFoodMenu from './components/home/FastFood/FastFoodMenu'; // Ensure this path is correct

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <div className="flex-grow">
        <Outlet />
      </div>
      <FooterTop />
      <Footer />
      <FooterBottom />
    </div>
  );
};


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "category/:categoryName", element: <CategoryProducts /> },
        { path: "product/:_id", element: <ProductDetails /> },
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <SignIn /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "fast-food-menu", element: <FastFoodMenu /> }, 
      ],
    },
  ]
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
