import React, {useEffect, useState} from 'react';
import styles from '../styles/Register.module.css';
import { supabase } from "../../lib/supabase";
import { useRouter } from 'next/router';
import MenuInvitados from "@/pages/MenuInvitados";
import useUserStore from "../../lib/UserStore";


export default function Register() {
    const router = useRouter();
    const userId = useUserStore((state) => state.userId);
    const [datos, setDatos]=useState(null)
    const [file, setFile] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [description, setDescription] = useState('');
    const [signo, setSigno] = useState('');
    const [ciudades, setCiudades] = useState('');

    useEffect(() => {
        if (userId){
            router.push(`/MiPerfil/${userId}`);
        }
    }, []);

    const verificarNombre = (e) => {
        setNombre(e.target.value);
    }
    const verificarEmail = (e) => {
        setEmail(e.target.value);
    }

    const verificarPassword = (e) => {
        setPassword(e.target.value);
    }

    const verificarFile = (e) => {
        setFile(e.target.files[0]);
    }

    const verificarEdad = (e) => {
        setEdad(e.target.value);
    }

    const verificarSexo = (e) => {
        setSexo(e.target.value);
    }

    const verificarDescription = (e) => {
        setDescription(e.target.value);
    }

    const verificarSigno = (e) => {
        setSigno(e.target.value);
    }

    const verificarCiudad = (e) => {
        setCiudades(e.target.value);
    }

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

    const guardar = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await handleUpload();
            const { data, error } = await supabase
                .from('usuarios')
                .insert([{
                    nombre: nombre,
                    email: email,
                    password: password,
                    edad: edad,
                    sexo: sexo,
                    avatar: imageUrl,
                    descripcion: description,
                    signo: signo,
                    ciudades: ciudades
                }])
                .select("*");

            setDatos(data[0].userId)

            if (error) {
                throw error;
            }

            alert('Registrazione inviata');
            router.push('/Login');
        } catch (error) {
            alert('Errore nell\'invio della registrazione', error);
        }
    };

    useEffect(() => {
        try {
            if (datos) {
                router.push(`/MiPerfil/${userId}`);
            }

        }
        catch (error) {
            alert('Errore nell\'invio della registrazione', error);
        }
    }, []);
    return (
        <>
            <MenuInvitados/>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={guardar}>
                    <h1 className={styles.title}>Registrazione</h1>

                    <div className={styles.inputGroup}>
                        <label htmlFor="nombre" className={styles.label}>Nome</label>
                        <input value={nombre} onChange={verificarNombre} type="text" id="nombre"
                               className={styles.input} required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input value={email} onChange={verificarEmail} type="email" id="email" className={styles.input}
                               required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input value={password} onChange={verificarPassword} type="password" id="password"
                               className={styles.input} required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="avatar" className={styles.label}>Avatar</label>
                        <input onChange={verificarFile} type="file" id="avatar" className={styles.input} required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="edad" className={styles.label}>Età</label>
                        <input value={edad} onChange={verificarEdad} type="number" id="edad" className={styles.input}
                               required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="sexo" className={styles.label}>Orientamento Sessuale</label>
                        <select id="sexo" className={styles.select} value={sexo} onChange={verificarSexo} required>
                            <option value="">Seleziona...</option>
                            <option value="Maschile">Maschile</option>
                            <option value="Femminile">Femminile</option>
                            <option value="Altro">Altro</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description" className={styles.label}>Descrizione</label>
                        <textarea id="description" className={styles.textarea} value={description}
                                  onChange={verificarDescription} required></textarea>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="signo" className={styles.label}>Segno Zodiacale</label>
                        <select id="signo" className={styles.select} value={signo} onChange={verificarSigno} required>
                            <option value="">Seleziona...</option>
                            <option value="Ariete">Ariete</option>
                            <option value="Toro">Toro</option>
                            <option value="Gemelli">Gemelli</option>
                            <option value="Cancro">Cancro</option>
                            <option value="Leone">Leone</option>
                            <option value="Vergine">Vergine</option>
                            <option value="Bilancia">Bilancia</option>
                            <option value="Scorpione">Scorpione</option>
                            <option value="Saggitario">Sagittario</option>
                            <option value="Capricorno">Capricorno</option>
                            <option value="Acquario">Acquario</option>
                            <option value="Pesci">Pesci</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="ciudades" className={styles.label}>Città</label>
                        <select id="ciudades" className={styles.select} value={ciudades} onChange={verificarCiudad}
                                required>
                            <option value="">Seleziona...</option>
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

                    <button
                        disabled={
                            nombre === '' ||
                            email === '' ||
                            password === '' ||
                            file === null ||
                            edad === '' ||
                            sexo === '' ||
                            description === '' ||
                            signo === '' ||
                            ciudades === ''
                        }
                        type="submit"  className={styles.button}>
                        Registrati
                    </button>
                </form>
            </div>
        </>
    );
}
