import React, { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css';
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/router';

export default function Post() {
    const [post, setPost] = useState('');
    const [file, setFile] = useState(null);
    const [auxId, setAuxId] = useState(null);
    const [counter, setCounter] = useState(0);
    const [verPost, setVerPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { userId } = router.query;

    const verificar = (e) => {
        setPost(e.target.value);
    };

    const verificar2 = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        setAuxId(userId);
    }, [userId]);

    useEffect(() => {
        async function fetchPosts() {
            setCounter(counter + 1);
            const { data: info, error } = await supabase
                .from('post')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', auxId);

            if (error) {
                console.error('Errore nel recupero dei post', error);
                return;
            }
            setVerPost(info);
        }
        if (counter <= 1) {
            fetchPosts();
        }
    }, [verPost, auxId, counter]);

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
                .insert([{ post: post, imagen: imageUrl, userId: auxId }])
                .select("*");

            if (error) {
                throw error;
            }

            alert('Registrazione inviata');
        } catch (error) {
            alert('Errore nell\'invio del post', error.message);
        }
    };

    return (
        <>
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
}
