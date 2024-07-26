import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavMenu.module.css';
import Head from 'next/head';
import useUserStore from "../../lib/UserStore";
function MyPage() {
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

const NavMenu = (user) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [resultado, setResultado] = useState('');
    const userId = useUserStore((state) => state.userId);
    const info = localStorage.getItem('userlogin');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const borrar = () => {
        localStorage.removeItem('userlogin');
        alert('Sessione terminata');
        router.push('/Login');
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
                            <Link href="/Perfiles" className={router.pathname === '/Perfiles' ? styles.active : ''}>
                                Profili
                            </Link>
                        </li>
                        <li>
                            <Link href="/Muro" className={router.pathname === '/Muro' ? styles.active : ''}>
                                Muro
                            </Link>
                        </li>
                        <li>
                            <Link href={`/MiPerfil/${info}`}
                                  className={router.pathname === `/MiPerfil/${info}` ? styles.active : ''}>
                                Il Mio Profilo
                            </Link>
                        </li>
                        <li>
                            <Link href={`/Match/${info}`}
                                  className={router.pathname === `/Match/${info}` ? styles.active : ''}>
                                Incontro
                            </Link>
                        </li>
                        <li hidden={true}>
                            <Link href={`/PerfilUsuario/${userId}`}
                                  className={router.pathname === `/PerfilUsuario/${userId}` ? styles.active : ''}>
                                Profilo Utente
                            </Link>
                        </li>
                        <li>
                            <Link href={`/Recibidas/${userId}`}
                                  className={router.pathname === `/Recibidas/${userId}` ? styles.active : ''}>
                                Inviti Ricevuti
                            </Link>
                        </li>
                        <li>
                            <Link href='/' onClick={borrar}>
                                Esci
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

export default NavMenu;
