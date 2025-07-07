'use client';
import Image from 'next/image';
import './Pokemart.css';
import Link from 'next/link';

export default function Pokemart() {
  return (
    <div className="pokemart-container">
      <div className="top-row">
        <div className="left">
          <Image src="/images/eleveuse.webp" alt="eleveuse" width={300} height={500} className="eleveuse" />
        </div>
        <div className="right">
            <Image src="/images/textbox.webp" alt="textbox" width={250} height={80} className="textbox" />
            <Image src="/images/pokemart.webp" alt="pokemart" width={300} height={300} className="pokemart-img" />
        <div className="bottom-text">
            <p>rendez-vous directement sur notre catalogue,<br />faites votre choix et passez en caisse !</p>
            <Link href="/catalogue" className="enter-button">Entrer</Link>
        </div>
        </div>
      </div>
    </div>
  );
}

