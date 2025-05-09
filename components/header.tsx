"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import Image from "next/image";

import Container from "./container";
import { siteDetails } from "@/data/siteDetails";
import { menuItems } from "@/data/menuItems";
import { useUser, UserButton } from "@clerk/nextjs";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white mx-auto w-full shadow-md">
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2">
            <Image
              src={siteDetails.siteLogo}
              alt={siteDetails.siteName}
              width={40}
              height={40}
              className="rounded-full shadow-md"
              priority
            />
            <span className="manrope text-xl font-semibold text-primary-red cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-primary-text font-medium hover:text-primary-red transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Button - Only shows when authenticated */}
          {isLoaded && isSignedIn && (
            <div className="hidden md:flex ml-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8", // Adjust size as needed
                    userButtonPopoverCard:
                      "shadow-lg dark:shadow-gray-800 dark:bg-bg1", // Custom styling
                  },
                }}
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* User Button - Only shows when authenticated */}
            {isLoaded && isSignedIn && (
              <div className="mr-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10", // Adjust size as needed
                      userButtonPopoverCard:
                        "shadow-lg dark:shadow-gray-800 dark:bg-bg1", // Custom styling
                    },
                  }}
                />
              </div>
            )}

            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary text-white focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-primary-text font-medium hover:text-primary-red transition-colors"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#cta"
                className="text-white bg-primary hover:bg-red-500 px-5 py-2 rounded-full block w-fit"
                onClick={toggleMenu}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
