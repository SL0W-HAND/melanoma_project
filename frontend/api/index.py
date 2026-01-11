from fastapi import FastAPI, UploadFile, File, HTTPException
from mangum import Mangum
import numpy as np
from PIL import Image
import io
import onnxruntime as ort  # <--- CAMBIO 1: Importar onnxruntime
import os

app = FastAPI()

# Load ONNX model at startup
# Asegúrate de que tu archivo se llame 'model.onnx' o ajusta el nombre aquí
model_path = os.path.join(os.path.dirname(__file__), "your_model.onnx")

# <--- CAMBIO 2: Inicializar la sesión de ONNX
ort_session = ort.InferenceSession(model_path)

# Obtener el nombre de la entrada (input) que el modelo espera
input_name = ort_session.get_inputs()[0].name
# Obtener el nombre de la salida (opcional, pero buena práctica)
output_name = ort_session.get_outputs()[0].name

# Define the classes
classes = [
    'Melanocytic Nevi (nv)',
    'Benign Keratosis-like Lesions (bkl)',
    'Dermatofibroma (df)',
    'Melanoma (mel)',
    'Vascular Lesions (vasc)',
    'Basal Cell Carcinoma (bcc)',
    'Actinic Keratoses and Intraepithelial Carcinoma (akiec)'
]

classes2 = ['Non Cancerous', 'Cancerous']

def is_cancerous(numeric_label):
    if numeric_label in [3, 5, 6]:
        return 1
    else:
        return 0

async def preprocess_image(image: UploadFile):
    """Preprocess the uploaded image for model input"""
    try:
        contents = await image.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        img = img.resize((128, 128))
        
        # Convertir a array y normalizar
        img_array = np.array(img, dtype=np.float32) / 255.0
        
        # --- CORRECCIÓN AQUÍ ---
        # La imagen actual es (128, 128, 3) -> (Alto, Ancho, Canales)
        # Necesitamos mover los Canales al principio: (3, 128, 128)
        img_array = np.transpose(img_array, (2, 0, 1))
        
        # Añadir dimensión del batch: (1, 3, 128, 128)
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    """Predict using model.onnx"""
    try:
        if not image:
            raise HTTPException(status_code=400, detail="No image provided")
        
        # Preprocess image
        img_array = await preprocess_image(image)
        
        # <--- CAMBIO 3: Ejecutar inferencia con ONNX
        # run(nombres_outputs, {nombre_input: datos})
        # Si pasas None en outputs, devuelve todos.
        onnx_pred = ort_session.run([output_name], {input_name: img_array})
        
        # ONNX devuelve una lista de resultados, tomamos el primero
        prediction = onnx_pred[0]
        
        # Process results (Igual que antes, numpy funciona igual)
        # Nota: Si tu modelo devuelve logits (números no normalizados), 
        # podrías necesitar aplicar softmax aquí, dependiendo de cómo fue exportado.
        
        type_of_lesion = classes[np.argmax(prediction)]
        cancer_diagnosed = classes2[is_cancerous(np.argmax(prediction))]
        
        # Si la predicción no suma 1 (es logits), confidence podría ser > 1 o negativo.
        # Asumiendo que el modelo ya tiene Softmax al final:
        confidence = np.max(prediction)
        confidence_percentage = int(confidence * 100)
        
        return {
            "type_of_lesion": type_of_lesion,
            "cancer_diagnosed": cancer_diagnosed,
            "confidence": confidence_percentage
        }
    
    except HTTPException:
        raise
    except Exception as e:
        # Es útil imprimir el error en consola para debuggear dimensiones
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def index():
    return {"message": "Melanoma prediction API (ONNX). Use /predict endpoint."}

# Add this at the end for Vercel
handler = Mangum(app)