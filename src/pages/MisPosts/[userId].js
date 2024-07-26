import React, { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/router';

export default function MisPost() {
    const [post, setPost] = useState('');
    const [file, setFile] = useState(null);
    const [verPost, setVerPost] = useState([]);
    const [idPost, setIdPost] = useState(0); // Agregar esta línea
    const router = useRouter();
    const [contador, setContador] = useState(0); // Agregar esta línea
    const { userId } = router.query;

    const verificar = (e) => {
        setPost(e.target.value);
    };

    const verificar2 = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('post')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', userId);


            if (error) {
                console.error('Errore nel recupero dei post', error);
                return;
            }
            setVerPost(data);
            setIdPost(verPost.post_id)
            setContador(contador + 1)
        }

        if (contador === 0 || contador===1) {
            fetchPosts()
        }


    },  [verPost]);


    const handleUpload = async () => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = async () => {
                const base64data = reader.result;

                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ file: base64data }),
                    });

                    const data = await response.json();
                    resolve(data.url);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const enviar = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await handleUpload();
            const { data, error } = await supabase
                .from('post')
                .insert([{ post: post, imagen: imageUrl, userId: userId }])
                .select("*");

            if (error) {
                throw error;
            }

            alert('Post inviato');
            setVerPost([...verPost, { post, imagen: imageUrl }]);
            setPost(''); // Limpiar la textarea
            setFile(null); // Limpiar el file input
            document.getElementById('imagen').value = null; // Resetear el input de archivo
        } catch (error) {
            alert('Errore nell\'invio del post', error.message);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Post</h1>

                <textarea value={post} onChange={verificar} className={styles.textarea} placeholder="Scrivi il tuo post..." />
                <div className={styles.inputGroup}>
                    <input onChange={verificar2} type="file" id="imagen" className={styles.input} required />
                </div>
                <button disabled={post === '' || file === null} onClick={enviar} className={styles.button}>Inviare</button>
                {verPost.map((post, index) => (
                    <div key={index} className={styles.postCard}>
                        <p className={styles.post}>{post.post}</p>
                        <img src={post.imagen} alt={post.post} className={styles.imagen} />
                    </div>
                ))}
            </div>
        </>
    );
}
