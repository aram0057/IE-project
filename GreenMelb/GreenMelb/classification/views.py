from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import torch
import cv2
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.models import Model
import os
from django.conf import settings
from tensorflow.keras.models import load_model

# Load YOLO model
yolo_model = torch.hub.load('ultralytics/yolov5', 'yolov5m', pretrained=True)
# Load classification model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(settings.BASE_DIR, 'backend', 'models', 'waste_classification_model.h5')
classification_model = load_model(model_path)
class_labels = ['E-Waste', 'Organic', 'Recyclable']
# Load VGG16 for feature extraction
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(150, 150, 3))
feature_extractor = Model(inputs=base_model.input, outputs=base_model.output)

def preprocess_and_extract_features(cropped_pil_image):
    img_array = keras_image.img_to_array(cropped_pil_image.resize((150, 150)))
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    features = feature_extractor.predict(img_array)
    features_flattened = features.reshape(features.shape[0], -1)
    return features_flattened

@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and 'uploaded_file' in request.FILES:
        uploaded_file = request.FILES['uploaded_file']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        file_path = fs.path(filename)

        # Read the uploaded image
        original_image = cv2.imread(file_path)
        results = yolo_model(original_image)
        detections = results.xyxy[0].numpy()

        # Set a confidence threshold
        confidence_threshold = 0.5
        detections = [detection for detection in detections if detection[4] >= confidence_threshold]

        background_colors = {
            'E-Waste': (255, 153, 153),   
            'Organic': (153, 255, 153),   
            'Recyclable': (153, 153, 255)
        }
        for detection in detections:
            x1, y1, x2, y2, conf, cls = detection
            xmin, ymin, xmax, ymax = int(x1), int(y1), int(x2), int(y2)
            
            # Crop the detected object from the image
            cropped_image = original_image[ymin:ymax, xmin:xmax]
            cropped_pil_image = Image.fromarray(cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB))
            
            # Extract features using VGG16
            features_flattened = preprocess_and_extract_features(cropped_pil_image)
            
            # Classify the extracted features
            prediction = classification_model.predict(features_flattened)
            predicted_class_index = np.argmax(prediction, axis=1)[0]
            predicted_class_label = class_labels[predicted_class_index]
            class_color = background_colors[predicted_class_label]
            
            # Calculate font scale and thickness based on image size
            font_scale = max(0.5, min(xmax - xmin, ymax - ymin) / 400)  # Scale font based on object size
            font_thickness = int(max(1, min(xmax - xmin, ymax - ymin) / 100)) # Scale thickness similarly
            
            # Calculate text size and position
            label = f"{predicted_class_label}: {conf:.2f}"
            text_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, font_scale, font_thickness)[0]
            text_x, text_y = xmin, max(ymin - 10, text_size[1] + 10)  # Ensure text is within image bounds
            box_coords = ((text_x, text_y - text_size[1] - 10), (text_x + text_size[0] + 10, text_y + 5))
            
            # Draw a filled rectangle as the background for the text
            cv2.rectangle(original_image, box_coords[0], box_coords[1], class_color, cv2.FILLED)
            
            text_color = (0, 0, 0)  
            
            # Make the bounding box thicker
            cv2.rectangle(original_image, (xmin, ymin), (xmax, ymax), class_color, 5)
            
            # Put the text on top of the background rectangle
            cv2.putText(original_image, label, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 
                        font_scale, text_color, font_thickness, lineType=cv2.LINE_AA)

        # Save the processed image
        processed_image_path = os.path.join(fs.location, f"processed_{filename}")
        cv2.imwrite(processed_image_path, original_image)
        processed_file_url = fs.url(f"processed_{filename}")

        print('Processed file URL:', processed_file_url)

        return JsonResponse({
            'status': 'file processed successfully',
            'processed_file_url': processed_file_url
        })

    return JsonResponse({'error': 'Invalid request method'}, status=400)
