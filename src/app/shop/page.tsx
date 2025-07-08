'use client';
import styles from './shop.module.css';
import Image from 'next/image';

export default function Shop() {
    return(
        <section>
            <div className={styles.shopcontainer}>
                <div className={styles.fond}></div>
                <Image src="/images/presentoir-long.png" alt="presentoir" width={1100} height={420} className={styles.presentoir}/>
            </div>
        </section>
    )
}