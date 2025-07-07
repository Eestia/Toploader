import Carousel from "@/components/Carousel/Carousel";
import styles from "./page.module.css";
import Pokemart from "@/components/Pokemart/Pokemart";

export default function Home() {
  return (
    <div>
      <main>
      <Carousel/>
      <Pokemart/>
      </main>
      <footer>
      </footer>
    </div>
  );
}
