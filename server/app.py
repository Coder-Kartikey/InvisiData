from flask import Flask, request, send_file, jsonify
import os
import cv2
import numpy as np
from werkzeug.utils import secure_filename
from steganography import encode_data, load_image as load_image_encode
from decode_steganography import decode_data, load_image as load_image_decode

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def cleanup_file(path):
    try:
        if os.path.exists(path):
            os.remove(path)
    except Exception as e:
        app.logger.error(f"Cleanup failed for {path}: {e}")

@app.route('/encode', methods=['POST'])
def encode():
    if 'image' not in request.files or 'message' not in request.form:
        return jsonify({'error': 'Image and message are required.'}), 400

    image_file = request.files['image']
    message = request.form['message']

    if image_file.filename == '' or not allowed_file(image_file.filename):
        return jsonify({'error': 'Valid image file required.'}), 400

    filename = secure_filename(image_file.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    encoded_image_path = os.path.join(UPLOAD_FOLDER, 'encoded_' + filename)

    try:
        image_file.save(image_path)
        image = load_image_encode(image_path)
        encoded_image = encode_data(image, message)
        cv2.imwrite(encoded_image_path, encoded_image)
        return send_file(encoded_image_path, mimetype='image/png')
    except Exception as e:
        app.logger.error(f"Encoding error: {e}")
        return jsonify({'error': 'Encoding failed.'}), 500
    finally:
        cleanup_file(image_path)
        cleanup_file(encoded_image_path)

@app.route('/decode', methods=['POST'])
def decode():
    if 'image' not in request.files:
        return jsonify({'error': 'Image is required.'}), 400

    image_file = request.files['image']

    if image_file.filename == '' or not allowed_file(image_file.filename):
        return jsonify({'error': 'Valid image file required.'}), 400

    filename = secure_filename(image_file.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)

    try:
        image_file.save(image_path)
        image = load_image_decode(image_path)
        decoded_message = decode_data(image)
        return jsonify({'message': decoded_message})
    except Exception as e:
        app.logger.error(f"Decoding error: {e}")
        return jsonify({'error': 'Decoding failed.'}), 500
    finally:
        cleanup_file(image_path)

if __name__ == '__main__':
    app.run(debug=False)