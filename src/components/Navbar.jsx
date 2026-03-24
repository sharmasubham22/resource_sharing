import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';
import DarkMode from './DarkMode';

export default function Navbar() {
  const firebase = useFirebase();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="mb-12">
      <nav className="bg-background fixed w-full z-20 top-0 start-0 p-3 font-body">
        <div className="flex flex-wrap items-center justify-between mx-auto px-5 py-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-text-primary font-bold whitespace-nowrap">
              ShareStack
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <DarkMode />
            {firebase.user === null ? (
              <a
                href="/login"
                className="text-brand-medium hover:underline  text-lg inline-flex items-center py-1"
              >
                Login
              </a>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex text-sm bg-background rounded-full md:me-0 hover:ring-4 hover:ring-brand-softer"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full border border-brand"
                    src={
                      firebase.user?.userPhoto ||
                      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    }
                    alt="user photo"
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 z-50 ${dropdownOpen ? "" : "hidden"} bg-card border border-border rounded-base shadow-lg w-44`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 text-md border-b border-border">
                    <span className="block text-text-primary ">
                      {firebase.user?.name}
                    </span>
                    <span className="block text-text-secondary truncate">
                      {firebase.user?.email}
                    </span>
                  </div>
                  <ul
                    className="p-2 text-md text-text-secondary "
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <a
                        href="/my-dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="inline-flex items-center w-full p-2 hover:bg-brand-softer hover:text-text-primary rounded cursor-pointer"
                      >
                        My Dashboard
                      </a>
                    </li>

                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          firebase.logout();
                        }}
                        className="inline-flex items-center w-full p-2 hover:bg-brand-softer text-red-400 rounded cursor-pointer"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-primary rounded-base md:hidden hover:bg-brand-medium hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-soft"
              aria-controls="navbar-user"
              aria-expanded={navOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          <div
            className={`${navOpen ? "" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className=" flex flex-col p-4 md:p-0 mt-4 border border-border rounded-base text-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <a
                  href="/"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-text-primary hover:bg-brand-softer md:hover:bg-transparent md:border-0 md:hover:text-brand-medium md:p-0 md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-text-primary rounded hover:bg-brand-softer md:hover:bg-transparent md:border-0 md:hover:text-brand-medium md:p-0 md:dark:hover:bg-transparent"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-text-primary rounded hover:bg-brand-softer md:hover:bg-transparent md:border-0 md:hover:text-brand-medium md:p-0 md:dark:hover:bg-transparent"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-text-primary rounded hover:bg-brand-softer md:hover:bg-transparent md:border-0 md:hover:text-brand-medium md:p-0 md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-text-primary rounded hover:bg-brand-softer md:hover:bg-transparent md:border-0 md:hover:text-brand-medium md:p-0 md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
