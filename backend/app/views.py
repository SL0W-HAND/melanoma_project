from django.shortcuts import render
from keras.models import load_model


# Create your views here.
from django.http import HttpResponse

model1 = load_model('model1.h5')
model2 = load_model('model2.h5')

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# create endpoints for an api

def predict1(request):
    if request.method == 'POST':
        data = request.POST
        prediction = model1.predict(data)
        return HttpResponse(prediction)
    else:
        return HttpResponse("Invalid request method")