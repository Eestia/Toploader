'use client';
import Image from 'next/image';
import './navbar.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="logo" />
      <ul>
        <li><Link href="/info">Info</Link></li>
        <li><Link href="/new">New In</Link></li>
        <li><Link href="/shop">Shop All</Link></li>
        <li><Link href="/booster">Booster Pack</Link></li>
      </ul>
    </nav>
  );
}

