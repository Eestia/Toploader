// 'use client';
// import styles from './shop.module.css';
// import Image from 'next/image';
// import Carte from "../../components/carte/carte"

// export default function Shop() {
//     return(
//         <section>
//             <div className={styles.shopcontainer}>
//                 <div className={styles.fond}></div>
//                 <Image src="/images/presentoir-long.png" alt="presentoir" width={1100} height={420} className={styles.presentoir}/>
//             </div>
//             <Carte />
//         </section>
//     )
// }
'use client';
import { useEffect, useState } from 'react';
import styles from './shop.module.css';
import Image from 'next/image';
import Carte from '../../components/carte/carte';

type PokemonData = {
  name: string;
  apiTypes: { name: string }[];
  stats: { attack: number };
  image: string;
};

// Liste de priorité des types
const typePriority = [
  'Plante', 'Feu', 'Eau', 'Électrik', 'Glace',
  'Combat', 'Psy', 'Sol', 'Roche', 'Insecte',
  'Spectre', 'Ténèbres', 'Dragon', 'Acier', 'Fée',
  'Poison', 'Vol', 'Normal'
];

// Fonction pour déterminer le type préféré
function getPreferredType(apiTypes: { name: string }[]): string {
  return (
    apiTypes
      .slice()
      .sort(
        (a, b) =>
          typePriority.indexOf(a.name) - typePriority.indexOf(b.name)
      )[0]?.name || 'Normal'
  );
}

export default function Shop() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/pokemon')
      .then((res) => res.json())
      .then((data) => setPokemons(data.slice(0, 10))); // Limite à 10 pour test
  }, []);

  return (
    <section>
      <div className={styles.shopcontainer}>
        <div className={styles.fond}></div>
        <Image
          src="/images/presentoir-long.png"
          alt="presentoir"
          width={1100}
          height={420}
          className={styles.presentoir}
        />
      </div>

      <div className={styles.cartes}>
        {pokemons.map((poke) => (
            <Carte
            key={poke.name}
            name={poke.name}
            type={poke.apiTypes.map((t) => t.name)} // ← tableau de string
            attack={poke.stats.attack}
            image={poke.image}
            />
        ))}
      </div>
    </section>
  );
}


