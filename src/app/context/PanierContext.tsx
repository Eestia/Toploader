'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Pokemon = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type PanierContextType = {
  panier: Pokemon[];
  achats: Pokemon[];
  ajouterAuPanier: (pokemon: Pokemon) => void;
  retirerDuPanier: (id: number) => void;
  confirmerAchat: () => void;
  argent: number;
  inventaire: Pokemon[];
};

const PanierContext = createContext<PanierContextType | undefined>(undefined);

export const PanierProvider = ({ children }: { children: ReactNode }) => {
  const [panier, setPanier] = useState<Pokemon[]>([]);
  const [achats, setAchats] = useState<Pokemon[]>([]); // <- AJOUTÉ
  const [inventaire, setInventaire] = useState<Pokemon[]>([]);
  const [argent, setArgent] = useState<number>(1000); // Argent initial

  const ajouterAuPanier = (pokemon: Pokemon) => {
    setPanier((prev) => [...prev, pokemon]); // pokemon doit venir de l'API complète
  };

  const retirerDuPanier = (id: number) => {
    setPanier((prev) => prev.filter((p) => p.id !== id));
  };

  const confirmerAchat = () => {
    const total = panier.reduce((acc, item) => acc + item.price, 0);
    if (argent >= total) {
      setInventaire((prev) => [...prev, ...panier]);
      setArgent((prev) => prev - total);
      setAchats((prev) => [...prev, ...panier]); // <- AJOUTÉ correctement
      setPanier([]);
    }
  };

  return (
    <PanierContext.Provider
      value={{
        panier,
        achats,
        ajouterAuPanier,
        retirerDuPanier,
        confirmerAchat,
        argent,
        inventaire,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) throw new Error('usePanier must be used within a PanierProvider');
  return context;
};
