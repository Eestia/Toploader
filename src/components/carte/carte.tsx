import './carte.css';
import Image from 'next/image';

type PokemonProps = {
  name: string;
  type: string[]; // tableau de types
  attack: number;
  image: string;
};

export default function Carte({ name, type, attack, image }: PokemonProps) {
  // Dictionnaire des couleurs par type
  const typeColors: { [key: string]: string } = {
    acier: 'rgb(95, 89, 97)',
    combat: 'rgb(160, 53, 19)',
    dragon: 'rgb(104, 90, 211)',
    eau: 'rgb(0, 125, 137)',
    electrik: 'rgb(205, 136, 13)',
    fée: 'rgb(192, 92, 169)',
    feu: 'rgb(152, 69, 1)',
    glace: 'rgb(17, 141, 135)',
    insecte: 'rgb(97, 117, 23)',
    normal: 'rgb(124, 124, 124)',
    plante: 'rgb(59, 116, 6)',
    poison: 'rgb(47, 17, 46)',
    psy: 'rgb(144, 62, 126)',
    roche: 'rgb(96, 60, 34)',
    sol: 'rgb(51, 25, 4)',
    spectre: 'rgb(83, 58, 85)',
    tenebres: 'rgb(32, 32, 32)',
    vol: 'rgb(81, 122, 117)',
  };

  // Nettoie les noms de type et extrait les couleurs
  const typeList = type.map(t =>
    t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  );
  const [type1, type2] = typeList;
  const color1 = typeColors[type1] || 'white';
  const color2 = type2 ? typeColors[type2] || 'white' : null;

  const backgroundStyle = {
    background: color2
      ? `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`
      : color1,
  };

  return (
    <div className="carte-container" style={{ position: 'relative' }}>
      <h1 id="nom">{name}</h1>
      <h2 id="type">{type.join(' / ')}</h2>
      <h2 id="atk">{attack} ATK</h2>

      {/* Fond de la carte coloré */}
      <div id="bgcard" style={backgroundStyle}></div>
      {/* Image de fond (optionnelle) */}
      <Image
        src={`/images/carte/${type1}.png`}
        alt={`Carte ${type1}`}
        width={500}
        height={700}
        className="carte"
      />

      {/* Image du Pokémon */}
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="pkmnimg"
      />
    </div>
  );
}


