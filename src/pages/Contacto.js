import NavMenu from "@/pages/NavMenu";
import React from "react";
import styles from '@/styles/Contacto.module.css';
const Contacto = () => {
    return (
        <div className={styles.container}>
            <NavMenu />
            <h1>Contatto</h1>
            <p>Siamo qui per aiutarti!</p>

        </div>
    );
}

export default Contacto;
