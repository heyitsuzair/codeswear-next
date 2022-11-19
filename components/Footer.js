import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-400 bg-white body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/"
              className="flex title-font font-medium items-center md:justify-start justify-center text-white"
            >
              <Image
                width={250}
                height={150}
                src="/logo.png"
                alt="Loading..."
              />
            </Link>
            <p className="mt-2 text-sm text-gray-500 px-4">
              Engineered For Excellence
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">
                Shop
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href="/tshirts"
                    className="text-gray-400 hover:text-black"
                  >
                    Tshirt
                  </Link>
                </li>
                <li>
                  <Link href="/mugs" className="text-gray-400 hover:text-black">
                    Mugs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hoodies"
                    className="text-gray-400 hover:text-black"
                  >
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stickers"
                    className="text-gray-400 hover:text-black"
                  >
                    Stickers
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">
                Categories
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">
                Policy
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">
                Contact
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black">Fourth Link</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-75">
          <div className="container mx-auto py-4 justify-center px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2022 Codeswear —
              <a
                href="https://github.com/heyitsuzair"
                rel="noopener noreferrer"
                className="text-black ml-1"
                target="_blank"
              >
                Made With ❤ By UZAIR
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
