import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import styles from "@/styles/MiPerfil.module.css";
import MisPost from "@/pages/MisPosts/[userId]";
import { supabase } from "../../../lib/supabase";
import NavAvanzado from "@/pages/NavAvanzado";
import useUserStore from "../../../lib/UserStore";

const MiPerfil = () => {
    const [usuarios, setUsuarios] = useState([]);
    const router = useRouter();
    const userId = useUserStore((state) => state.userId);
    const dato = localStorage.getItem('userlogin');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                let { data: usuarios, error } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('userId', dato);
                if (error) throw error;
                setUsuarios(usuarios);
            } catch (error) {
                console.log('error', error);
            } finally {
                console.log('finally');
            }
        };

        fetchUsuarios();
    }, [userId]);

    return (
        <>
            <NavAvanzado  userId={userId}/>
            <div className={styles.container}>
                <h1 className={styles.title}>Profilo Utente</h1>
                {usuarios.map((usuario) => (
                    <div key={usuario.userId} className={styles.profileCard}>
                        <img src={usuario.avatar} alt={usuario.nombre} className={styles.avatar} />
                        <h1 className={styles.name}>{usuario.nombre}</h1>
                        <h2 className={styles.email}>{usuario.email}</h2>
                        <h3 className={styles.age}>{usuario.edad}</h3>
                        <p className={styles.description}>{usuario.description}</p>
                        <p className={styles.sexo}>{usuario.sexo}</p>
                        <p className={styles.signo}>{usuario.signo}</p>
                        <p className={styles.orientation}>{usuario.orientation}</p>
                        <p className={styles.vibe}>{usuario.vibe}</p>
                    </div>
                ))}
            </div>
            <MisPost />
        </>
    );
};

export default MiPerfil;
