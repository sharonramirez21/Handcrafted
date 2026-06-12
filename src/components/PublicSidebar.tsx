'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SignOutInBtn from "@/components/SignOutInBtn";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function PublicSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/login") {
    return null
  } else if (pathname.startsWith("/dashboard")) {
    return <DashboardSidebar />
  }

  return (
    <>
        <button
          className="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div>
          <nav className="nav">
            <Link href="/" aria-label="Go to Handcrafted Haven homepage">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 150"
                  width="200"
                  height="100"
                  >
                  <rect width="100%" height="100%" fill="#faf7f2" />

                  <g transform="translate(20, 30)">
                  <g transform="translate(0, 10)">
                  <path
                  d="M 15 65 C 15 30, 65 30, 65 65 C 65 35, 35 15, 40 15 C 45 15, 15 35, 15 65 Z"
                  fill="#d97706"
                  opacity="0.15"
                  />
                  <path
                  d="M 15 60 C 15 20, 65 20, 65 60 C 65 30, 25 10, 40 10 C 55 10, 15 30, 15 60"
                  fill="none"
                  stroke="#78350f"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  />
                  <path
                  d="M 40 10 Q 48 2, 45 -5 Q 35 0, 40 10"
                  fill="#86efac"
                  />
                  <circle cx="40" cy="42" r="5" fill="#ca8a04" />
                  </g>

                  <text
                  x="85"
                  y="44"
                  fontFamily="Georgia, serif"
                  fontSize="30"
                  fontWeight="bold"
                  fill="#451a03"
                  letterSpacing="1"
                  >
                  Handcraft
                  </text>

                  <text
                  x="87"
                  y="68"
                  fontFamily="system-ui, sans-serif"
                  fontSize="24"
                  fontWeight="300"
                  fill="#78350f"
                  letterSpacing="6"
                  >
                  HAVEN
                  </text>

                  <line
                  x1="87"
                  y1="52"
                  x2="230"
                  y2="52"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.3"
                  />
                  </g>
              </svg>

            </Link>

            <Link href="/">
              <Image src="/icons/house-solid.svg" alt="home icon" width={18} height={18}></Image>
              Home
            </Link>

            <Link href="/products">
              <Image src="/icons/bag-shopping.svg" alt="products icon" width={18} height={18}></Image>
              Products
            </Link>

            <Link href="/sellers">
              <Image src="/icons/users-solid.svg" alt="sellers icon" width={18} height={18}></Image>
              Sellers
            </Link>

            <Link href="/about">
              <Image src="/icons/heart-solid.svg" alt="sellers icon" width={18} height={18}></Image>
              About Us
            </Link>
          </nav>
          <hr className="sidebar-divider" />
          <nav className="nav">
            <Link href="/dashboard">
              <Image src="/icons/table-cells.svg" alt="dashboard icon" width={19} height={19}></Image>
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="dashboard-conteiner-button">
          <SignOutInBtn />
        </div>
      </aside>
    </> 
  );
}