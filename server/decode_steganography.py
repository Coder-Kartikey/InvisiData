import cv2
import numpy as np

def load_image(image_path):
    image = cv2.imread(image_path)
    return image

END_MARKER = '1111111111111110'

def decode_data(image):
    binary_data = ""
    for values in image:
        for pixel in values:
            r, g, b = format(pixel[0], '08b'), format(pixel[1], '08b'), format(pixel[2], '08b')
            binary_data += r[-1] + g[-1] + b[-1]
    
    # Split into 8-bit chunks
    bytes_list = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    decoded_data = ""
    for i in range(len(bytes_list)):
        if ''.join(bytes_list[i:i+2]) == END_MARKER:
            break
        decoded_data += chr(int(bytes_list[i], 2))
    return decoded_data

if __name__ == "__main__":
    image_path = 'encoded_image.png'  # Path to the encoded image
    image = load_image(image_path)
    decoded_data = decode_data(image)
    print('Decoded data:', decoded_data)
