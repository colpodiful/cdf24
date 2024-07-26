import styles from '../styles/Login.module.css'
import { supabase } from "../../lib/supabase";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import useUserStore from "../../lib/UserStore";
import MenuInvitados from "@/pages/MenuInvitados"; // Asegúrate de tener esta imagen en la carpeta public

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [datos, setDatos] = useState(null);
    const [signin, setSignin] = useState(false);
    const setUserId = useUserStore((state) => state.setUserId);
    const userId = useUserStore((state) => state.userId);
    useEffect(() => {
        if(userId){
            router.push(`/MiPerfil/${userId}`);
        }
    }, []);

    const verificarEmail = (e) => {
        setEmail(e.target.value);
    }

    const verificarPass = (e) => {
        setPassword(e.target.value);
    }

    async function entrar(e) {
        e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        let { data: usuarios, error } = await supabase
            .from('usuarios')
            .select('userId, email, password')
            .eq('email', email)
            .eq('password', password);

        const userId = usuarios[0].userId;
        const datosuario=localStorage.setItem('userlogin', userId);
        setUserId(userId);
        


        if (error) {
            alert('Errore nella ricerca dell\'utente: ', error.message);
            return;
        }

        if (usuarios.length > 0) {
            setSignin(true);
            alert('Benvenuto');

            router.push(`/MiPerfil/${userId}`);
        } else {
            alert('Utente o password errati');
        }
    };

    // useEffect(() => {
    //     try {
    //         if (setUserId) {
    //             router.push(`/MiPerfil/${datos}`);
    //         }
    //
    //     }
    //     catch (error) {
    //         alert('Errore nell\'invio della registrazione', error);
    //     }
    // }, []);
    //

    return (
        <>
            <MenuInvitados/>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={entrar}>
                    <h1 className={styles.title}>Accedi</h1>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input onChange={verificarEmail} type="email" id="email" className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input onChange={verificarPass} type="password" id="password" className={styles.input} required />
                    </div>
                    <button type="submit" className={styles.button}>Accedi</button>
                </form>
            </div>
        </>
    )
}
