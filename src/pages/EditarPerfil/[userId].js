
import React, {useEffect, useState} from "react";
import NavAvanzado from "@/pages/NavAvanzado";
import styles from "@/styles/Register.module.css";
import {supabase} from '../../../lib/supabase'
import {useRouter} from "next/router";
import useUserStore from "../../../lib/UserStore";

const EditarPerfil = () => {
    const [usuarios, setUsuarios] = useState([]);
    const router = useRouter();
    const userId = useUserStore((state) => state.userId);
    const [nombre, setNombre] = useState('');
    const [file, setFile] = useState(null);
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [description, setDescription] = useState('');
    const [signo, setSigno] = useState('');
    const [ciudades, setCiudades] = useState('');



            const verificarNombre = (e) => {
            setNombre(e.target.value);
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

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                let { data: usuarios, error } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('userId', userId);
                if (error) throw error;
                setUsuarios(usuarios);
                setNombre(usuarios[0].nombre);
                setEdad(usuarios[0].edad);
                setSexo(usuarios[0].sexo);
                setDescription(usuarios[0].descripcion);
                setSigno(usuarios[0].signo);
                setCiudades(usuarios[0].ciudades);
                setFile(usuarios[0].avatar)

            } catch (error) {
                console.log('error', error);
            } finally {
                console.log('finally');
            }
        };

        fetchUsuarios();
    }, [userId]);



            const editar = async (e) => {
            e.preventDefault();
            try {
                const imageUrl = await handleUpload();
                const {data: data, error} = await supabase
                    .from('usuarios')
                    .update([{
                        nombre: nombre,
                        edad: edad,
                        sexo: sexo,
                        avatar: imageUrl,
                        descripcion: description,
                        signo: signo,
                        ciudades: ciudades
                    }])
                    .select("*")
                    .eq('userId', userId);
                alert('Modificacion');
                router.push(`/MiPerfil/${userId}`);
            }catch (e) {
                console.log(e)
            }

        };

            return (
            <>
                <NavAvanzado />
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={editar}>
                        <h1 className={styles.title}>Modificacion</h1>

                        <div className={styles.inputGroup}>
                            <label htmlFor="nombre" className={styles.label}>Nome</label>
                            <input value={nombre} onChange={verificarNombre} type="text" id="nombre"
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
                            type="submit"  className={styles.button}>
                            Modificar
                        </button>
                    </form>
                </div>
            </>

    )

}

export default EditarPerfil
