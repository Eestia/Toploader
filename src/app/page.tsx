import Carousel from "@/components/Carousel/Carousel";
import styles from "./page.module.css";
import Pokemart from "@/components/Pokemart/Pokemart";
import PokemonCarousel from "@/components/pokecarou/pokecarou";

export default function Home() {
  return (
    <div>
      <main>
      <Carousel/>
      <PokemonCarousel/>
      <Pokemart/>
      </main>
      <footer>
      </footer>
    </div>
  );
}
