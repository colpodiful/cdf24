import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavMenu.module.css';
import Head from 'next/head';
import useUserStore from "../../lib/UserStore";
function MenuInvitadosPagina() {
    return (
        <>
            <Head>
                <title>Colpo di Fulmine</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Descripción de la página"/>
                <meta name="keywords" content="nextjs, seo, meta tags"/>
                <meta name="author" content="Edgar Morales"/>
            </Head>
            <div>Contenido de la página</div>
        </>
    );
}

const MenuInvitados = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [resultado, setResultado] = useState('');


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const borrar = () => {

    };

    return (
        <>
            <Head>
                <title>Colpo di Fulmine</title>
            </Head>
            <div className={styles.navHeader}>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    ☰
                </button>
                <h2>Menù</h2>
            </div>
            <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                <div className={styles.navContent}>
                    <button className={styles.closeButton} onClick={toggleMenu}>✕</button>
                    <ul>
                        <li>
                            <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
                                Inizio
                            </Link>
                        </li>
                        <li>
                            <Link href="/Acerca" className={router.pathname === '/Acerca' ? styles.active : ''}>
                                Informazioni
                            </Link>
                        </li>
                        <li>
                            <Link href="/Contacto" className={router.pathname === '/Contacto' ? styles.active : ''}>
                                Contatto
                            </Link>
                        </li>
                        <li>
                            <Link href="/Promociones"
                                  className={router.pathname === '/Promociones' ? styles.active : ''}>
                                Promozioni
                            </Link>
                        </li>
                        <li>
                            <Link href="/Login" className={router.pathname === '/Login' ? styles.active : ''}>
                                Accesso
                            </Link>
                        </li>
                        <li >
                            <Link hidden={resultado && true} href="/Registro" className={router.pathname === '/Registro' ? styles.active : ''}>
                                Registrazione
                            </Link>
                        </li>


                        <li>
                            <Link hidden={true} href='/Sponsor'
                                  className={router.pathname === '/Sponsor' ? styles.active : ''}>
                                Sponsor
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <section className={styles.section}>
                <hr className={styles.hr}/>
            </section>
        </>
    );
};

export default MenuInvitados;
