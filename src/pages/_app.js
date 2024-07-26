// pages/_app.js
import { useEffect } from 'react';
 // Asegúrate de importar desde la ruta correcta

function MyApp({ Component, pageProps }) {


    return <Component {...pageProps} />;
}

export default MyApp;
