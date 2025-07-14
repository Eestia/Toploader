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
  ajouterAuPanier: (pokemon: Pokemon) => void;
  retirerDuPanier: (id: number) => void;
};

const PanierContext = createContext<PanierContextType | undefined>(undefined);

export const PanierProvider = ({ children }: { children: ReactNode }) => {
  const [panier, setPanier] = useState<Pokemon[]>([]);

  const ajouterAuPanier = (pokemon: Pokemon) => {
    setPanier(prev => [...prev, pokemon]);
  };

  const retirerDuPanier = (id: number) => {
    setPanier(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PanierContext.Provider value={{ panier, ajouterAuPanier, retirerDuPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) throw new Error('usePanier must be used within a PanierProvider');
  return context;
};
