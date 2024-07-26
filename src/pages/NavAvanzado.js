import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavMenu.module.css';
import React, {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import useUserStore from "../../lib/UserStore";

const NavAvanzado = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [resultado, setResultado] = useState('');
    const userId = useUserStore((state) => state.userId);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <Head>
                <title>Colpo de Fulmine</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Descripción de la página"/>
                <meta name="keywords" content="nextjs, seo, meta tags"/>
                <meta name="author" content="Edgar Morales"/>
            </Head>
            <div className={styles.navHeader}>
                <h2>Menú</h2>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    ☰
                </button>
            </div>
            <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                <div className={styles.navContent}>
                    <button className={styles.closeButton} onClick={toggleMenu}>✕</button>
                    <ul>
                        <li>
                            <Link href={`/EditarPerfil/${userId}`}
                                  className={router.pathname === `/EditarPerfil/${userId}` ? styles.active : ''}>
                                Modificar Perfil
                            </Link>
                        </li>
                        <li>
                            <Link href={`/MiPerfil/${userId}`}
                                  className={router.pathname === `/MiPerfil/${userId}` ? styles.active : ''}>
                                il Mio Profilo
                            </Link>
                        </li>
                        <li>
                            <Link href='/Perfiles'
                                  className={router.pathname==='/Perfiles' ?  styles.active : ''}>
                                Perfiles
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};


export default NavAvanzado;
