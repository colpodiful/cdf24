import React, { useEffect, useState } from 'react';
import NavEspecial from "@/pages/NavEspecial";
import { useRouter } from 'next/router';
import styles from '@/styles/Invitacion.module.css';
import { supabase } from "../../../lib/supabase";
import useUserStore from "../../../lib/UserStore";

const Invitaciones = () => {
    const router = useRouter();
    const userAmigo = router.query.userId;
    const [registros, setRegistros] = useState([]);
    const [miNombre, setMiNombre] = useState('');
    const [nombre, setNombre] = useState('');
    const [miCiudad, setMiCiudad] = useState('');
    const [ciudades, setCiudades] = useState('');
    const [recibidos, setRecibidos] = useState([]);
    const userId = useUserStore((state) => state.userId);

    useEffect(() => {
        if (userAmigo) {
            const fetchData = async () => {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('userId', userAmigo);
                if (error) {
                    console.error("Error fetching data: ", error);
                } else {
                    if (data.length > 0) {
                        setRegistros(data);
                        setNombre(data[0].nombre);
                        setCiudades(data[0].ciudades);
                    }
                }
            };
            fetchData();
        }
    }, [userAmigo]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('match')
                .select('*')
                .eq('amigoUserId', userAmigo);
            if (error) {
                console.error("Error fetching data: ", error);
            } else {
                setRecibidos(data);
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        const fetchMiDatos = async () => {
            if (userId) {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('userId', userId);
                if (error) {
                    console.error("Error fetching mi datos: ", error);
                } else {
                    if (data.length > 0) {
                        setMiNombre(data[0].nombre);
                        setMiCiudad(data[0].ciudades);
                    }
                }
            } else {
                alert('Recuerda iniciar sesión');
            }
        };

        fetchMiDatos();
    }, [userId]);

    const agregarInvitacion = async () => {
        try {
            const { data, error } = await supabase
                .from('match')
                .insert([{
                    miUserId: userId,
                    amigoUserId: userAmigo,
                    miNombre: miNombre,
                    amigoNombre: nombre,
                    miCiudad: miCiudad,
                    amigoCiudad: ciudades
                }]);
            if (error) {
                throw error;
            }
            console.log(userId, userAmigo, miNombre, nombre, miCiudad, ciudades);
            alert('Invitación enviada');
        } catch (e) {
            alert('Error al enviar la invitación', e.message);
        }
    };

    return (
        <div className={styles.container}>
            <NavEspecial />
            <h1>Invitaciones Enviadas</h1>
            <div className={styles.invitaciones}>
                {registros.length > 0 ? (
                    registros.map((registro) => (
                        <div key={registro.userId} className={styles.invitacion}>
                            <h2>Nombre: {registro.nombre}</h2>
                            <h2>Ciudad: {registro.ciudades}</h2>
                            <button onClick={agregarInvitacion}>Confirmar</button>
                        </div>
                    ))
                ) : (
                    <p>No hay invitaciones disponibles.</p>
                )}
            </div>
            <h1>Invitaciones Recibidas</h1>
            <div className={styles.invitaciones}>
                {recibidos.length > 0 ? (
                    recibidos.map((registro) => (
                        <div key={registro.amigoUserId} className={styles.invitacion}>
                            <h2>Nombre: {registro.nombre}</h2>
                            <h2>Ciudad: {registro.ciudades}</h2>
                        </div>
                    ))
                ) : (
                    <p>No hay invitaciones disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default Invitaciones;
