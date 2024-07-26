import styles from '@/styles/Gallery.module.css'


const Gallery = () => {

const images = [
    '/images/foto1.jpeg',
    '/images/foto2.jpeg',
    '/images/foto3.jpeg',
    '/images/foto4.jpeg',
    // Añade más rutas de imágenes si es necesario
];

    return (
        <div className={styles.gallery}>
            {images.map((src, index) => (
                <div key={index} className={styles.galleryItem}>
                    <img src={src} alt={`italia ${index + 1}`} className={styles.image}/>
                </div>
            ))}
        </div>
    );
}

export default Gallery;


