'use client';
import Image from 'next/image';
import './navbar.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isShopPage = pathname === '/shop';

  return (
    <nav className={`navbar ${isShopPage ? 'shop-bg' : ''}`}>
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
