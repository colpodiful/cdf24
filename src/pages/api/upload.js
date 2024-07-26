// src/pages/api/upload.js
import cloudinary from '../../../lib/cloudinary';

export default async function subirFoto(req, res) {
    if (req.method === 'POST') {
        const { file } = req.body;

        try {
            const result = await cloudinary.uploader.upload(file);
            res.status(200).json({ url: result.secure_url });
        } catch (error) {
            res.status(500).json({ error: 'Error uploading file', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
