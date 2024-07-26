import React from 'react';
import styles from '../styles/Promociones.module.css';
import NavMenu from '@/pages/NavMenu';

const Promociones = () => {
    return (
        <>
            <NavMenu />
            <div className={styles.container}>
                <h1 className={styles.title}>Le Nostre Promozioni</h1>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h2>Gratis</h2>
                        <p className={styles.price}>€0</p>
                        <p>Accesso limitato</p>
                        <p>Pubblicità inclusa</p>
                        <p>Supporto di base</p>
                        <button className={styles.button}>Inizia Gratis</button>
                    </div>
                    <div className={`${styles.card} ${styles.featured}`}>
                        <h2>Mensile</h2>
                        <p className={styles.price}>€8.99<span>/mese</span></p>
                        <p>Accesso completo</p>
                        <p>Senza pubblicità</p>
                        <p>Supporto prioritario</p>
                        <button className={styles.button}>Inizia Mensile</button>
                    </div>
                    <div className={styles.card}>
                        <h2>Annuale</h2>
                        <p className={styles.price}>€99<span>/anno</span></p>
                        <p>Accesso completo</p>
                        <p>Senza pubblicità</p>
                        <p>Supporto prioritario</p>
                        <button className={styles.button}>Inizia Annuale</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Promociones;

