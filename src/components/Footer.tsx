'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Footer() {
   const pathname = usePathname();
  
    if (pathname === "/login") {
      return null
    } else if (pathname.startsWith("/login")) {
      return null
    }
  return (
    <footer className="footer">
      <div>
        <h4>Shop</h4>
        <Link href="/products">All Products</Link>
        <Link href="#">Categories</Link>
        <Link href="#">New Arrivals</Link>
        <Link href="#">Best Sellers</Link>
      </div>

      <div>
        <h4>Info</h4>
        <Link href="#">About Us</Link>
        <Link href="#">Contact</Link>
        <Link href="#">FAQ</Link>
        <Link href="#">Shipping</Link>
      </div>

      <div>
        <h4>For Sellers</h4>
        <Link href="/login">Seller Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/">Guidelines</Link>
        <Link href="/">Support</Link>
      </div>

     
    </footer>
  );
}
