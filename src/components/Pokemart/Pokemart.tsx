'use client';
import Image from 'next/image';
import './Pokemart.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Pokemart() {

    const router = useRouter()


  return (
    <div className="pokemart-container">
        <Image src="/images/pokeshop2.png" alt="eleveuse" width={1500} height={900} className="eleveuse" />
        <div className='pokemart-in'></div>
            <Image src="/images/porte.png" alt="porte" width={1000} height={650} className="porte" />
        <div className='textbox'>
            <h2>
                oh! vous souhaitez acheter des cartes?
            </h2>
        </div>
        <div>
            <Image src="/images/buisson.png" alt="buisson1" width={300} height={300} className="buisson" />
        </div>
        <div>
            <Image src="/images/buisson.png" alt="buisson2" width={200} height={200} className="buisson2" />
        </div>
         <div>
            <Image src="/images/pancarte.png" alt="pancarte" width={220} height={220} className="pancarte" />
        </div>
        <div>
            <button onClick={()=> router.push("/shop")} className='button1'>
                ENTRER
            </button>
        </div>
    <div className='pokemart-grass'></div>
    </div>
  );
}

