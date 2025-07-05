import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png"; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <li className="font-semibold">
        <NavLink
          to="/books"
          
        >
          All Books
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink
          to="/create-book"
          onClick={handleNavClick}
         
        >
          Add Book
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink
          to="/borrow-summary"
          onClick={handleNavClick}
        >
          Borrow Summary
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-[#0000] py-2 border-b border-gray-100 font-primary">
      <div className="flex items-center justify-between w-[95%] mx-auto">
        <div className="">
          <Link to="/" className="flex items-center">
            <div className="mx-auto bg-primary  rounded-full flex items-center justify-center w-12 h-12">
             <img src={logo} alt="logo" />
            </div>
            <h1 className="hidden lg:flex text-lg font-bold ">
              Library Management
            </h1>
          </Link>
        </div>

        {/* desktop navLink */}
        <div className="hidden lg:flex items-center space-x-10">
          <ul className="flex space-x-10 list-none text-black text-lg">
            {navLinks}
          </ul>
        </div>

        {/* mobile navLink */}
        <div className="lg:hidden">
          <Menu
            className="w-8 h-8 text-blue-700 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-0 left-0 w-full h-screen bg-white transition-transform duration-500 z-50 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <X
            className="w-8 h-8 text-blue-700 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className="flex flex-col items-center space-y-4 p-4">
          <ul className="list-none space-y-4 text-center text-black">
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
