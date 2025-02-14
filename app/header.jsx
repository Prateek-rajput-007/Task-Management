import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../components/Clients";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Task Management</h2>
      </div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <li><LogoutBtn /></li>
      </ul>
    </nav>
  );
};

export default Header;
