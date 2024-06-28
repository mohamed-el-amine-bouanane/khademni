"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import Link from "next/link";
// import Logout from "@/public/assets/logout.png";
import { handleLogout } from "../../utils/actions";
import { usePathname, useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import reviewer from "@/public/Landing/reviewer.png";
import Image from "next/image.js";
import { BACKEND_URL } from "@/app/constants/index.js";

export default function NavBar({ user }) {
  const authContext = useContext(AuthContext);

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeLink, setActiveLink] = useState(pathname);

  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setIsMenuOpen(false);
    setActiveLink(link);
  };
  const handlelogout = () => {
    authContext.setAuthState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleLogout();
    setIsMenuOpen(false);
    setActiveLink("/");
    router.push("/");
  };

  return (
    <nav className="NavBar bg-mainColor  top-0 left-0 py-4 md:py-7 px-20 flex items-center justify-between text-white shadow-md   ">
      <div
        className={`w-full flex flex-col lg:flex-row flex-grow lg:flex lg:justify-between items-center text-center lg:text-left lg:w-auto `}
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            onClick={() => handleLinkClick("/")}
            className="text-xl text-white font-bold"
            href="/"
          >
            Khedemni
            {/* <img src="/navbar/logo.png" className="w-14" alt="login" /> */}

          </Link>
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-white hover:border-primary transition-all duration-500 border-white"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`text-lg  lg:flex lg:flex-row gap-6 ${
            isMenuOpen ? "flex flex-col items-center" : "hidden"
          }`}
        >
          <Link
            className={`leftNavLink ${
              activeLink === "/#about" ? "active" : ""
            }`}
            href="/#about"
            onClick={() => handleLinkClick("/#about")}
          >
            About
          </Link>
          <Link
            className={`leftNavLink ${
              activeLink === "/#services" ? "active" : ""
            }`}
            href="/#services"
            onClick={() => handleLinkClick("/#services")}
          >
            Services
          </Link>
          <Link
            className={`leftNavLink ${
              activeLink === "/offers" ? "active" : ""
            }`}
            href="/offers"
            onClick={() => handleLinkClick("/offers")}
          >
            Offers
          </Link>
          <Link
            className={`leftNavLink ${
              activeLink.startsWith("/#reviews") ? "active" : ""
            }`}
            href="/#reviews"
            onClick={() => handleLinkClick("/#reviews")}
          >
            Reviews
          </Link>

          {authContext.isUserAuthenticated &&<Link
            className={`leftNavLink ${
              activeLink.startsWith("/chat") ? "active" : ""
            }`}
            href="/chat"
            onClick={() => handleLinkClick("/chat")}
          >
            Chats
          </Link>}

          {/* {user?.role === "admin" && (
            <Link
              className={`leftNavLink ${
                activeLink === "/admin" ? "active" : ""
              }`}
              href="/admin"
              onClick={() => handleLinkClick("/admin")}
            >
              AdminPanel
            </Link>
          )} */}
        </div>
        <div
          className={`${isMenuOpen ? "flex mt-6 lg:mt-0" : " lg:flex hidden"}`}
        >
          {(!authContext.isUserAuthenticated) ? (
            <div className="flex text-lg justify-between gap-8">
              <Link
                className={` flex items-center font-bold justify-between gap-3 ${
                  activeLink === "/login" ? "active" : ""
                }`}
                href="/login"
                onClick={() => handleLinkClick("/login")}
              >
                <img src="/navbar/Vector.svg" alt="login" />
                <p>Login</p>
              </Link>
            </div>
          ) : (
            <div className="flex-row flex text-lg   justify-between items-center gap-5 ">
              <Link
                className={`leftNavLink ${
                  ""
                  // activeLink === `/users/${user?.id}` ? "active" : ""
                }`}
                href={`/users/${user?.id}`}
                onClick={() => handleLinkClick(`/users/${user?.id}`)}
              >
                <Image
                  src={
                    user.profilePicture
                      ? BACKEND_URL + user.profilePicture
                      : reviewer
                  }
                  height={35}
                  width={35}
                  quality={100}
                  alt="profile"
                  className="overflow-hidden object-cover aspect-square  rounded-full"
                />
              </Link>
              <button
                className="mt-3 md:mt-0 hover:opacity-50"
                onClick={() => {
                  handlelogout();
                }}
              >
                <IoIosLogOut className="font-extrabold text-white text-3xl scale-110" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
