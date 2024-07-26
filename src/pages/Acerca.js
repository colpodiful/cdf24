import Gallery from '../pages/Components/Gallery'
import NavMenu from "@/pages/NavMenu";
import styles from '@/styles/Contacto.module.css'

export default function Acerca() {
    return (
        <div className={styles.container}>
            <NavMenu/>
            <h1 className={styles.h1}>Informazioni sul colpo di fulmine ⚡️ </h1>

            <p className={styles.p}>
                Avere un colpo di fulmine significa innamorarsi alla velocità del lampo! È un autentico processo di
                incanto che travolge tutto e ci proietta alla velocità della luce su un altro pianeta. Si tratta di un
                impatto spettacolare e violento che sembra altrettanto subito che improvviso. È la nascita irrazionale e
                immediata del sentimento amoroso per una persona sconosciuta. Ci sentiamo come ipnotizzati e rapiti da
                un concentrato di felicità tanto gioioso quanto inaspettato.
                Il vero colpo di fulmine non genera alcuna paura o ansia esistenziale. Al contrario, ci sentiamo così
                appagati e felici che dichiarare il nostro amore sembra ovvio. La spontaneità prevale e le barriere
                cadono rapidamente. È semplice, vogliamo sapere tutto dell'altro! Ci sentiamo subito vicini a questa
                persona, e la nostra storia sembra fluire naturalmente. Il colpo di fulmine è un'esperienza strana,
                unica e magica. È una forza esterna sconosciuta, quasi soprannaturale, che sconvolge tutti i punti di
                riferimento. Tutto svanisce dal nostro campo di coscienza e di visione, tranne il viso di colui che ha
                cambiato la nostra vita. La felicità allo stato puro, in qualche modo!
                "L'amore è la cura.
                L'amore è il potere.
                L'amore è la magia dei cambiamenti.
                L'amore è la bellezza dello specchio divino.
            </p>
            <div className={styles.gallery}>
                <Gallery/>
            </div>
        </div>
    )
}
