import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';
import NavMenu from '@/pages/NavMenu';
import styles from '@/styles/Recibidas.module.css';

export default function Recibidas() {
    const [resultado, setResultado] = useState('');
    const router = useRouter();
    const userId = router.query.userId;
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const fetchLocalStorage = () => {
            if (window.localStorage) {
                const resultado = localStorage.getItem('userlogin');
                setResultado(resultado);
            }
        };

        fetchLocalStorage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('match')
                .select('*')
                .eq('amigoUserId', userId);

            if (error) {
                console.error("Error fetching data: ", error);
            } else {
                setDatos(data);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <div className={styles.container}>
            <NavMenu />
            <h1 className={styles.title}>Invitaciones Recibidas</h1>
            <div className={styles.invitaciones}>
                {
                    datos.length > 0 ? (
                        datos.map((dato) => (
                            <div key={dato.id} className={styles.invitacion}>
                                <p>{dato.miUserId}</p>
                                <p>{dato.miNombre}</p>
                                <p>{dato.miCiudad}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay invitaciones recibidas.</p>
                    )
                }
            </div>
        </div>
    );
}
