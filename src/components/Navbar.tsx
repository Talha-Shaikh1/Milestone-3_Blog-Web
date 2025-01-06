"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {Home, List, PenTool, PersonStandingIcon} from 'lucide-react'
import { ModeToggle } from "@/components/ui/ModeToggle";


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [, setIsPagesDropdownOpen] = useState(false);

  // Ref to detect clicks outside the dropdown
  const pagesDropdownRef = useRef<HTMLDivElement | null>(null);
  // Handle closing dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      pagesDropdownRef.current &&
      !pagesDropdownRef.current.contains(event.target as Node)
    ) {
      setIsPagesDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex w-full h-20 items-center justify-between border-b-2 relative px-10">
        <Link href={"/"}>
          <Image src={"/next.svg"} alt="" width={80} height={80} />
        </Link>

        <ul className="text-lg font-normal flex gap-5 lg:gap-10">
          <li className="hover:text-[#007580] flex items-center space-x-1">
            <Home />
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-[#007580] flex items-center space-x-1">
            <PersonStandingIcon />
            <Link href="/about/">About</Link>
          </li>
          <li className="relative cursor-pointer flex items-center">
            
            <Link href={"/categories/"}
            className="hover:text-[#007580] flex items-center "
            >
              <List className="mr-2"/>
              Categories</Link>

          </li>

          <li className="relative hover:text-[#007580] flex items-center space-x-1">
            <PenTool />
            <Link href="/authors/">Our Authors</Link>
          </li>
        </ul>

        <ModeToggle />


      </div>
      {/* Mobile menu */}
      <div className="md:hidden flex w-full h-20 items-center justify-around">
        <div className="flex items-center">
          <Image src={"/next.svg"} alt="" width={50} height={50} />
        </div>

        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Image
            src={isMobileMenuOpen ? "/cross-image.png" : "/menu-image.png"}
            alt="menu"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div
        className={`md:hidden bg-[#F0F2F3] overflow-hidden transition-all duration-500 border-b-2 mb-4 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="text-lg font-normal grid grid-cols-1 gap-4 p-4">
          <li className="hover:text-[#007580] flex items-center space-x-1">
            <Link href="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="hover:text-[#007580] flex items-center space-x-1">
            <Link href="/" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="hover:text-[#007580] flex items-center space-x-1">
            <Link href="/" onClick={handleLinkClick}>
              Categories
            </Link>
          </li>
          <li className="hover:text-[#007580] flex items-center space-x-1">
            <Link href="/" onClick={handleLinkClick}>
              Our Authors
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
