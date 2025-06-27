import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHouse,
  FaBookOpen,
  FaFile,
  FaSun,
  FaLinkedin,
  FaGithub,
  FaFacebook,
} from "react-icons/fa6";
import { IconMenu3, IconMoon } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isIntroDone: boolean;
  toggleTheme: () => void;
  theme: string;
}

type IconNavItem = {
  icon: React.ReactNode;
  to?: string;
  label?: string;
  link?: string;
  external?: boolean;
};

const icons: IconNavItem[] = [
  { icon: <FaHouse />, to: "/", label: "Home" },
  { icon: <FaBookOpen />, to: "/about", label: "About" },
  { icon: <FaFile />, to: "/projects", label: "Projects" },
  { icon: <FaSun />, label: "ThemeToggle" },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/yevheniia-tobolovska/",
    external: true,
  },
  {
    icon: <FaFacebook />,
    link: "https://www.facebook.com/your-profile",
    external: true,
  },
  {
    icon: <FaGithub />,
    link: "https://github.com/tobolovskaya",
    external: true,
  },
];

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
  const location = useLocation();

  return (
    <>
      {/* === Bottom Icon Nav === */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 px-6 py-3 bg-gray-300 dark:bg-neutral-800 rounded-2xl z-50 w-[95%] sm:w-auto shadow-lg"
      >
        {icons.map((item, index) => {
          const isActive = item.to && location.pathname === item.to;
          const baseClasses =
            "w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-gray-400 dark:hover:bg-gray-700";

          if (item.external) {
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClasses}
              >
                {item.icon}
              </a>
            );
          }

          if (item.label === "ThemeToggle") {
            return (
              <button
                key={index}
                onClick={toggleTheme}
                className={baseClasses}
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-300" />
                ) : (
                  <IconMoon className="text-zinc-700" />
                )}
              </button>
            );
          }

          return (
            <Link
              key={index}
              to={item.to!}
              className={`${baseClasses} ${isActive ? "text-purple-500" : ""}`}
            >
              {item.icon}
            </Link>
          );
        })}

        {/* Burger Button */}
        <button
          onClick={toggleOffcanvas}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 transition"
          aria-label="Toggle menu"
        >
          <IconMenu3 className="text-white" />
        </button>
      </motion.div>

      {/* === Offcanvas Overlay === */}
      <AnimatePresence>
        {isOffcanvasOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-[70] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleOffcanvas}
          />
        )}
      </AnimatePresence>

      {/* === Offcanvas Menu === */}
      <AnimatePresence>
        {isOffcanvasOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-64 bg-zinc-900 text-white z-[80] p-6 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={toggleOffcanvas} aria-label="Close menu">
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={toggleOffcanvas}>
                Home
              </Link>
              <Link to="/about" onClick={toggleOffcanvas}>
                About
              </Link>
              <Link to="/projects" onClick={toggleOffcanvas}>
                Projects
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
