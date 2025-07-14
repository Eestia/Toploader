import './globals.css';
import Navbar from '../components/Navbar/navbar';
import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import { VT323 } from 'next/font/google';
import { PanierProvider } from './context/PanierContext';

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt',
});

export const metadata: Metadata = {
  title: 'Mon site',
  description: 'Site de cartes ou autre',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body>
        <PanierProvider>
          <Navbar />
          <main>{children}</main>
          {/* Ajoute ce conteneur pour les Portals */}
          <div id="portal-root"></div>
        </PanierProvider>
      </body>
    </html>
  );
}



