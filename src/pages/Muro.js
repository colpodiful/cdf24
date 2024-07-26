import { useRouter } from 'next/router';
import NavMenu from '@/pages/NavMenu';
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import styles from "@/styles/Muro.module.css";

const Muro = () => {
    const router = useRouter();
    const { userId } = router.query; // Obtener userId de los parámetros de la URL
    const [verPost, setVerPost] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('post')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Errore nel recupero dei post', error);
                return;
            }
            setVerPost(data);
        }
        fetchPosts();
    }, [userId]);

    return (
        <>
            <NavMenu />
            <div className={styles.container}>
                <h1 className={styles.title}>Post</h1>
                {verPost.map((post, index) => (
                    <div key={index} className={styles.postCard}>
                        <p className={styles.post}>{post.post}</p>
                        <img src={post.imagen} alt={post.post} className={styles.imagen} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Muro;
