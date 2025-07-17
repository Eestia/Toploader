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
        <li><Link href="/">Acceuil</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/panier">Panier</Link></li>
        <li><Link href="/inventaire">Inventaire</Link></li>
        <li><Link href="/login">Se connecter</Link></li>
        <li><Link href="/profil">Profil</Link></li>
      </ul>

    </nav>
  );
}
