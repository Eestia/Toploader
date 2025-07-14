'use client';
import { useEffect, useState } from 'react';
import styles from './shop.module.css';
import Image from 'next/image';
import Carte from '../../components/carte/carte';
import CartePortal from '../../components/CartePortal/CartePortal';
import { usePanier } from '../../app/context/PanierContext'; // ✅ Assure-toi que le chemin est correct

type PokemonData = {
  name: string;
  apiTypes: { name: string }[];
  stats: { attack: number };
  image: string;
};

function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const typesOrder = [
  'plante', 'feu', 'eau', 'electrik', 'glace',
  'combat', 'psy', 'sol', 'roche', 'insecte',
  'spectre', 'tenebres', 'dragon', 'acier', 'fee',
  'poison', 'vol', 'normal'
];

function filterSingleTypePokemons(pokemons: PokemonData[]) {
  const filtered: PokemonData[] = [];
  for (const type of typesOrder) {
    const found = pokemons.find(p =>
      p.apiTypes.length === 1 &&
      removeAccents(p.apiTypes[0].name) === type &&
      !filtered.includes(p)
    );
    if (found) filtered.push(found);
    if (filtered.length >= typesOrder.length) break;
  }
  return filtered;
}

export default function Shop() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [allPokemons, setAllPokemons] = useState<PokemonData[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<PokemonData[]>([]);
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [chenVisible, setChenVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const { ajouterAuPanier } = usePanier(); // ✅ hook appelé correctement

  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/pokemon')
      .then(res => res.json())
      .then(data => {
        const filtered = filterSingleTypePokemons(data);
        setPokemons(filtered);
        setAllPokemons(data);
        setLoading(false);
      });
  }, []);

  const handleSelect = (name: string) => {
    const index = pokemons.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
    const fullIndex = allPokemons.findIndex(p => p.name.toLowerCase() === name.toLowerCase());

    if (fullIndex >= 0) {
      setSearch('');
      setFilteredSuggestions([]);
      setSelectedName(allPokemons[fullIndex].name);
      if (index === -1) {
        setPokemons(prev => [...prev, allPokemons[fullIndex]]);
      }
    }
  };

  return (
    <section className={styles.shopSection}>
      {loading && (
        <div className={styles.loadingContainer}>
          <Image src="/images/vendeuse.gif" alt="vendeuse" width={200} height={200} />
          <p className={styles.loadingText}>J'arrive tout de suite !</p>
        </div>
      )}

      <div className={styles.navAide}>
        <div className={styles.profChenWrapper}>
          <div className={styles.bulle} onClick={() => setChenVisible(true)}>
            Professeur Chen : Besoin d'aide ?
          </div>

          <div className={`${styles.chenContainer} ${chenVisible ? styles.visible : ''}`}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Rechercher un Pokémon"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                if (value) {
                  const results = allPokemons.filter(p =>
                    removeAccents(p.name).includes(removeAccents(value))
                  ).slice(0, 5);
                  setFilteredSuggestions(results);
                } else {
                  setFilteredSuggestions([]);
                }
              }}
            />
            {filteredSuggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {filteredSuggestions.map((p, idx) => (
                  <li key={idx} onClick={() => handleSelect(p.name)}>
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
            <Image src="/images/Chen.png" alt="Professeur Chen" width={390} height={830} className={styles.chen} />
          </div>
        </div>
      </div>

      <div className={styles.shopcontainer}>
        <Image src="/images/fond2-pokemart.png" alt="fondpokemart" width={1500} height={800} className={styles.fondpokemart} />
        <Image src="/images/table.png" alt="table" width={1500} height={800} className={styles.table} />
        <Image src="/images/presentoir-long.png" alt="presentoir" width={1100} height={420} className={styles.presentoir} />
        <Image src="/images/presentoir-milieu.png" alt="milieu" width={1100} height={420} className={styles.milieu} />
        <Image src="/images/presentoir-avant.png" alt="avant" width={1100} height={420} className={styles.avant} />
      </div>

      <div className={styles.cartes}>
        <div className={styles.rangéeArrière}>
          {pokemons.slice(0, 9).map((poke) => (
            <div key={poke.name} onClick={() => setSelectedName(poke.name)} style={{ cursor: 'pointer' }}>
              <Carte
                name={poke.name}
                type={poke.apiTypes.map(t => t.name)}
                attack={poke.stats.attack}
                image={poke.image}
              />
            </div>
          ))}
        </div>
        <div className={styles.rangéeAvant}>
          {pokemons.slice(9, 18).map((poke) => (
            <div key={poke.name} onClick={() => setSelectedName(poke.name)} style={{ cursor: 'pointer' }}>
              <Carte
                name={poke.name}
                type={poke.apiTypes.map(t => t.name)}
                attack={poke.stats.attack}
                image={poke.image}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedName && (
        <CartePortal
          pokemons={allPokemons}
          currentIndex={allPokemons.findIndex(p => p.name === selectedName)}
          onClose={() => setSelectedName(null)}
          onChangeIndex={idx => setSelectedName(allPokemons[idx].name)}
          ajouterAuPanier={ajouterAuPanier} // ✅ fonction passée au composant
        />
      )}
    </section>
  );
}
