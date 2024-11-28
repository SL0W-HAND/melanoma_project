import numpy as np
from django.http import JsonResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
from django.views.decorators.csrf import csrf_exempt

# Load the model at server startup
#the fisrt model is trained only with the images of the skin lesions
model1 = load_model('model1.h5')

#the second model is trained with transfer learning
model2 = load_model('model2.h5')

# Define the classes

classes = ['Melanocytic Nevi (nv)',

           'Benign Keratosis-like Lesions (bkl)',

           'Dermatofibroma (df)',

           'Melanoma (mel)',

           'Vascular Lesions (vasc)',

           'Basal Cell Carcinoma (bcc)',

           'Actinic Keratoses and Intraepithelial Carcinoma (akiec)']

classes2 = ['Non Cancerous',

            'Cancerous']

label_mapping2 = {
    "nv": 0,
    "bkl": 0,
    "df": 0,
    "mel": 1,
    "vasc": 0,
    "bcc": 1,
    "akiec": 1
}
def is_cancerous(numeric_label):
    if numeric_label in [3, 5, 6]:
        return 1
    else:
        return 0


@csrf_exempt
def predict1(request):
    if request.method == 'POST':
        try:
            # Get the image from the request
            image = request.FILES.get('image')

            if not image:
                return JsonResponse({"error": "No image provided"}, status=400)

            # Open and preprocess the image
            img = Image.open(image).convert('RGB')
            img = img.resize((128, 128))  # Adjust the size according to the model
            img_array = img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            prediction = model1.predict(img_array)
            # Make prediction
            type_of_lesion = classes[np.argmax(prediction)]
            cancer_diagnosed = classes2[is_cancerous(np.argmax(prediction))]
            confidence = np.max(prediction)
            confidence_percentage = int(confidence * 100)
            # Build JSON response
            res = {
                "type_of_lesion": type_of_lesion,
                "cancer_diagnosed": cancer_diagnosed,
                "confidence": confidence_percentage  # Confidence of the prediction
            }
            return JsonResponse(res, status=200)

        except Exception as e:
            # Handle unexpected errors
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

def predict2(request):
    if request.method == 'POST':
        try:
            # Get the image from the request
            image = request.FILES.get('image')

            if not image:
                return JsonResponse({"error": "No image provided"}, status=400)

            # Open and preprocess the image
            img = Image.open(image).convert('RGB')
            img = img.resize((128, 128))  # Adjust the size according to the model
            img_array = img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            prediction = model2.predict(img_array)
            # Make prediction
            type_of_lesion = classes[np.argmax(prediction)]
            cancer_diagnosed = classes2[is_cancerous(np.argmax(prediction))]
            confidence = np.max(prediction)
            confidence_percentage = int(confidence * 100)
            # Build JSON response
            res = {
                "type_of_lesion": type_of_lesion,
                "cancer_diagnosed": cancer_diagnosed,
                "confidence": confidence_percentage  # Confidence of the prediction
            }
            return JsonResponse(res, status=200)

        except Exception as e:
            # Handle unexpected errors
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)




from django.http import HttpResponse

def index(request):

    return HttpResponse("Hello, world. You're at the polls index.")
