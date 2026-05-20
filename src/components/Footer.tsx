import Link from "next/link";

export default function Footer() {
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
        <Link href="#">Guidelines</Link>
        <Link href="#">Support</Link>
      </div>

     
    </footer>
  );
}
