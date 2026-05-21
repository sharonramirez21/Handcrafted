import Link from "next/link";

export default function PublicSidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="logo-box"></div>

        <Link href="/" className="brand">
          Handcrafted Haven
        </Link>

        <nav className="nav">
          <Link href="/">
            {/*Logo here */}
            <span className="small-square">Logo</span>
          </Link>
          Home
           <Link href="/products">
            <span className="small-square"></span>
            Products
          </Link>

          <Link href="/sellers/">
            <span className="small-square"></span>
            Sellers
          </Link>

          <Link href="#">
            <span className="small-square"></span>
            About Us
          </Link>
        </nav>
        
        <hr className="sidebar-divider" />
        <nav className="nav">
          <Link href="/login">
            <span className="small-square"></span>
            Seller Login
          </Link>

          <Link href="/dashboard">
            <span className="small-square"></span>
            Dashboard
          </Link>
        </nav>
      </div>
       <Link href="/login" className="dashboard-button">
        Seller Login
      </Link>
    </aside>
  );
}