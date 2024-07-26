import NavEspecial from "@/pages/NavEspecial";
import { supabase } from "../../../lib/supabase";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/Match.module.css';
import foto from '@/pages/logo/logo.png'
import Image from "next/image";
import useUserStore from "../../../lib/UserStore";
export default function UserId() {
    const router = useRouter();
    const userId = useUserStore((state) => state.userId);

    const [filters, setFilters] = useState({
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false
    });
    const [edad1, setEdad1] = useState('');
    const [edad2, setEdad2] = useState('');
    const [sexo, setSexo] = useState('');
    const [signo, setSigno] = useState('');
    const [ciudades, setCiudades] = useState('');
    const [match, setMatch] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const verificarEdad1 = (e) => {
        const value = e.target.value;
        if (value.length <= 2) {
            setEdad1(value);
        } else {
            alert('L\'età non può essere maggiore di 2 cifre');
        }
    }

    const verificarEdad2 = (e) => {
        const value = e.target.value;
        if (value.length <= 2) {
            setEdad2(value);
        } else {
            alert('L\'età non può essere maggiore di 2 cifre');
        }
    }

    const verificarSexo = (e) => {
        setSexo(e.target.value);
    }

    const verificarSigno = (e) => {
        setSigno(e.target.value);
    }

    const verificarCiudad = (e) => {
        setCiudades(e.target.value);
    }

    const validarMatch = async () => {
        let consulta = supabase.from('usuarios').select('*');

        if (filters.checked1) {
            consulta = consulta.gte('edad', edad1).lte('edad', edad2);
        }
        if (filters.checked2) {
            consulta = consulta.eq('sexo', sexo);
        }
        if (filters.checked3) {
            consulta = consulta.eq('signo', signo);
        }
        if (filters.checked4) {
            consulta = consulta.eq('ciudades', ciudades);
        }
        const { data, error } = await consulta;
        if (error) {
            console.error('Errore nel recupero dei post', error);
            return;
        }
        setMatch(data);
        console.log('data', data)
    }

    const verPerfilUsuario = async (userId) => {
        router.push('/PerfilUsuario/' + userId);
    };

    return (
        <>
            <NavEspecial />
            <div className={styles.container}>
                <div className={styles.containerImage}>
                    <Image height={250} width={250} id='logo' src={foto} alt='logo' className={styles.Image} />
                </div>

            </div>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.checkGroup}>
                        <label htmlFor='edades'>Seleziona Fascia di Età</label>
                        <input type='checkbox'
                               name='checked1' onChange={handleCheckboxChange}
                               checked={filters.checked1} />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="edad1" className={styles.label}>Maggiore di questa Età</label>
                            <input min={18} value={edad1} onChange={verificarEdad1} type="number" id="edad1" className={styles.input} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="edad2" className={styles.label}>Minore di questa Età</label>
                            <input min={18} value={edad2} onChange={verificarEdad2} type="number" id="edad2" className={styles.input} />
                        </div>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.checkGroup}>
                        <label htmlFor="sexo">Seleziona Orientamento Sessuale</label>
                        <input
                            type='checkbox'
                            name='checked2'
                            onChange={handleCheckboxChange}
                            checked={filters.checked2}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="sexo" className={styles.label}>Orientamento Sessuale</label>
                        <select id="sexo" className={styles.select} value={sexo} onChange={verificarSexo} required>
                            <option value="">Selezionare...</option>
                            <option value="Maschile">Maschile</option>
                            <option value="Femminile">Femminile</option>
                            <option value="Altro">Altro</option>
                        </select>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.checkGroup}>
                        <label htmlFor='signo'>Seleziona Segno Zodiacale</label>
                        <input type='checkbox' name='checked3' onChange={handleCheckboxChange}
                               checked={filters.checked3} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="signo" className={styles.label}>Segno Zodiacale</label>
                        <select id="signo" className={styles.select} value={signo} onChange={verificarSigno} required>
                            <option value="">Selezionare...</option>
                            <option value="Ariete">Ariete</option>
                            <option value="Toro">Toro</option>
                            <option value="Gemelli">Gemelli</option>
                            <option value="Cancro">Cancro</option>
                            <option value="Leone">Leone</option>
                            <option value="Vergine">Vergine</option>
                            <option value="Bilancia">Bilancia</option>
                            <option value="Scorpione">Scorpione</option>
                            <option value="Sagittario">Sagittario</option>
                            <option value="Capricorno">Capricorno</option>
                            <option value="Acquario">Acquario</option>
                            <option value="Pesci">Pesci</option>
                        </select>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.checkGroup}>
                        <label htmlFor='ciudades'>Seleziona Città</label>
                        <input type='checkbox' name='checked4' onChange={handleCheckboxChange}
                               checked={filters.checked4} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="ciudades" className={styles.label}>Città</label>
                        <select id="ciudades" className={styles.select} value={ciudades} onChange={verificarCiudad} required>
                            <option value="">Selezionare...</option>
                            <option value="Bergamo">Bergamo</option>
                            <option value="Brescia">Brescia</option>
                            <option value="Milano">Milano</option>
                            <option value="Lecco">Lecco</option>
                            <option value="Como">Como</option>
                            <option value="Treviglio">Treviglio</option>
                            <option value="Desenzano">Desenzano</option>
                            <option value="Peschiera">Peschiera</option>
                            <option value="Sirmione">Sirmione</option>
                            <option value="Verona">Verona</option>
                            <option value="Novara">Novara</option>
                        </select>
                    </div>
                </section>
                <button onClick={validarMatch} className={styles.button}>Match</button>
                <section className={styles.matchResults}>
                    <div className={styles.matchContainer}>
                        {match.length > 0 && match.map((usuario) => (
                            <div key={usuario.userId} className={styles.profileCard}>
                                <img
                                    onClick={() => verPerfilUsuario(usuario.userId)}
                                    src={usuario.avatar}
                                    alt={usuario.nombre}
                                    className={styles.avatar}
                                />
                                <h1 className={styles.name}>{usuario.nombre}</h1>
                                <h3 className={styles.age}>{usuario.edad}</h3>
                                <p className={styles.description}>{usuario.description}</p>
                                <p className={styles.sexo}>{usuario.sexo}</p>
                                <p className={styles.signo}>{usuario.signo}</p>
                                <p className={styles.orientation}>{usuario.orientation}</p>
                                <p className={styles.ciudades}>{usuario.ciudades}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
