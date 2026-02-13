import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';

export default function Navbar() {
  const firebase = useFirebase();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="mb-12">
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 p-3 shadow-lg">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-bold whitespace-nowrap">
              ShareStack
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {firebase.user === null ? (
              <a
                href="/login"
                className="text-fg-brand hover:underline font-medium text-lg inline-flex items-center py-1"
              >
                Login
              </a>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex text-sm bg-neutral-primary rounded-full md:me-0 hover:ring-4 hover:ring-neutral-tertiary"
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
                  className={`absolute right-0 mt-2 z-50 ${dropdownOpen ? "" : "hidden"} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {firebase.user?.name}
                    </span>
                    <span className="block text-body truncate">
                      {firebase.user?.email}
                    </span>
                  </div>
                  <ul
                    className="p-2 text-sm text-body font-medium"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <a
                        href="/my-dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        My Dashboard
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => {
                          setDropdownOpen(false);
                          firebase.logout();
                        }}
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium text-red-600 rounded cursor-pointer"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
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
            className={`${navOpen ? '' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <a
                  href="/"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-heading hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => setNavOpen(false)}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
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
