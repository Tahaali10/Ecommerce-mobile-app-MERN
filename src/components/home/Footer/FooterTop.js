import React from "react";
import { FaHome, FaUser, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { setShowCartDrawer } from "../../../redux/orebiSlice";

const FooterTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.orebiReducer.products);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 w-full h-16 bg-[#ffffff] backdrop-blur-lg shadow-lg flex items-center justify-around z-50"
    >
      {/* Home Icon */}
      <div
        onClick={() => navigate("/")}
        className="flex flex-col items-center cursor-pointer text-[#317248]"
      >
        <FaHome size={24} />
        <p className="text-xs">Home</p>
      </div>

      {/* Login Icon */}
      <div
        onClick={() => navigate("/signin")}
        className="flex flex-col items-center cursor-pointer text-[#317248]"
      >
        <FaUser size={24} />
        <p className="text-xs">Login</p>
      </div>

      {/* Cart Icon */}
      <div
        onClick={() => navigate("/shop")}
        className="flex flex-col items-center cursor-pointer text-[#317248]"
      >
        <FaShoppingCart size={24} />
        <p className="text-xs">Shop</p>
      </div>

      {/* WhatsApp Icon */}
      <div
        onClick={() =>
          window.open(
            `https://wa.me/+923211949184?text=Hello, I have a query!`,
            "_blank"
          )
        }
        className="flex flex-col items-center cursor-pointer text-[#317248]"
      >
        <FaWhatsapp size={24} />
        <p className="text-xs">WhatsApp</p>
      </div>
    </motion.div>
  );
};

export default FooterTop;
