import { NextResponse } from 'next/server';
import ort from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Configuración de las clases
const classes = [
    'Melanocytic Nevi (nv)', 'Benign Keratosis-like Lesions (bkl)',
    'Dermatofibroma (df)', 'Melanoma (mel)', 'Vascular Lesions (vasc)',
    'Basal Cell Carcinoma (bcc)', 'Actinic Keratoses and Intraepithelial Carcinoma (akiec)'
];
const classes2 = ['Non Cancerous', 'Cancerous'];
const isCancerous = (idx) => ([3, 5, 6].includes(idx) ? 1 : 0);

// Variable global para reutilizar la sesión del modelo entre llamadas
let session = null;

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Cargar el modelo una sola vez (Singleton)
        if (!session) {
            // Intentar cargar desde public en producción o models en desarrollo
            let modelPath = path.join(process.cwd(), 'models', 'model.onnx');
            
            // Si no existe, intentar desde public (para Vercel)
            if (!fs.existsSync(modelPath)) {
                modelPath = path.join(process.cwd(), 'public', 'model.onnx');
            }
            
            console.log('Cargando modelo desde:', modelPath);
            session = await ort.InferenceSession.create(modelPath);
        }

        // Leer la imagen a Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Preprocesar con Sharp (NCHW) - usar removeAlpha() en lugar de ensureAlpha(false)
        const { data } = await sharp(buffer)
            .resize(128, 128)
            .removeAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Normalizar y transponer a NCHW
        const floatData = new Float32Array(3 * 128 * 128);
        for (let i = 0; i < 128 * 128; i++) {
            floatData[i] = data[i * 3] / 255.0;                   // R
            floatData[i + 128 * 128] = data[i * 3 + 1] / 255.0;   // G
            floatData[i + 2 * 128 * 128] = data[i * 3 + 2] / 255.0; // B
        }

        const inputName = session.inputNames[0];
        const tensor = new ort.Tensor('float32', floatData, [1, 3, 128, 128]);

        // Inferencia
        const output = await session.run({ [inputName]: tensor });
        const prediction = output[session.outputNames[0]].data;

        // Resultados
        const maxIdx = prediction.indexOf(Math.max(...prediction));
        
        return NextResponse.json({
            type_of_lesion: classes[maxIdx],
            cancer_diagnosed: classes2[isCancerous(maxIdx)],
            confidence: Math.round(prediction[maxIdx] * 100)
        });

    } catch (error) {
        console.error("Error en predicción:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}