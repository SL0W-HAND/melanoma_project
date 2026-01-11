from fastapi import FastAPI, UploadFile, File, HTTPException
from mangum import Mangum
import numpy as np
from PIL import Image
import io
import tensorflow as tf
import os

app = FastAPI()

# Load TFLite model at startup - use relative path
model_path = os.path.join(os.path.dirname(__file__), "model.tflite")
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

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
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    """Predict using model.tflite"""
    try:
        if not image:
            raise HTTPException(status_code=400, detail="No image provided")
        
        # Preprocess image
        img_array = await preprocess_image(image)
        
        # Run inference with TFLite
        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        prediction = interpreter.get_tensor(output_details[0]['index'])
        
        # Process results
        type_of_lesion = classes[np.argmax(prediction)]
        cancer_diagnosed = classes2[is_cancerous(np.argmax(prediction))]
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
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def index():
    return {"message": "Melanoma prediction API. Use /predict endpoint."}

# Add this at the end for Vercel
handler = Mangum(app)