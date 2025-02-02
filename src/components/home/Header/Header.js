import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 sticky top-0 z-50 border-b-[1px] border-b-gray-200" style={{ background: "#317248" }}>
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className="w-32 ml-0 object-cover" imgSrc={logo} />
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className={({ isActive }) =>
                      `flex font-semibold w-20 h-6 justify-center items-center px-12 text-base
                      ${isActive ? 'text-[#f9cc1f]' : 'text-[#ffffff]'}
                      hover:text-[#fcfbf3] hover:underline underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 last:border-r-0`
                    }
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
              style={{ color: "#f9cc1f" }} // Hamburger icon color
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-white-500 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full" style={{ background: "#317248" }}>
                    <img className="w-32 mb-6" src={logoLight} alt="logoLight" />
                    <ul className="text-gray-200 flex flex-col gap-2 m-5" >
                      {navBarList.map(({ _id, title, link }) => (
                        <li key={_id}>
                          <NavLink
                            to={link}
                            className={({ isActive }) =>
                              `font-normal text-lg 
                              ${isActive ? 'text-[#f9cc1f]' : 'text-[#ffffff]'}
                              hover:text-[#fcfbf3] hover:underline underline-offset-[4px] decoration-[1px]`
                            }
                            onClick={() => setSidenav(false)}
                            state={{ data: location.pathname.split("/")[1] }}
                          >
                            {title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    

                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300 " 
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
