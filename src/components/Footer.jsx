import React from 'react'

export default function Footer() {
  return (
    <div className='mt-auto'>
      <footer className="bg-neutral-950">
        <div className="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2026{" "}
            <a href="/" className="hover:underline">
              ShareStack™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
