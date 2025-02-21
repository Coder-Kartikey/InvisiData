import cv2
import numpy as np

def load_image(image_path):
    image = cv2.imread(image_path)
    return image

def text_to_binary(text):
    binary_data = ''.join(format(ord(i), '08b') for i in text)
    return binary_data

def encode_data(image, data):
    binary_data = text_to_binary(data)
    data_len = len(binary_data)
    binary_data += '1111111111111110'

    data_index = 0
    for values in image:
        for pixel in values:
            r, g, b = format(pixel[0], '08b'), format(pixel[1], '08b'), format(pixel[2], '08b')
            if data_index < data_len:
                pixel[0] = int(r[:-1] + binary_data[data_index], 2)
                data_index += 1
            if data_index < data_len:
                pixel[1] = int(g[:-1] + binary_data[data_index], 2)
                data_index += 1
            if data_index < data_len:
                pixel[2] = int(b[:-1] + binary_data[data_index], 2)
                data_index += 1
            if data_index >= data_len:
                break
    return image

def decode_data(image):
    binary_data = ""
    for values in image:
        for pixel in values:
            r, g, b = format(pixel[0], '08b'), format(pixel[1], '08b'), format(pixel[2], '08b')
            binary_data += r[-1] + g[-1] + b[-1]

    binary_data = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    decoded_data = ""
    for byte in binary_data:
        if byte == '11111111':
            break
        decoded_data += chr(int(byte, 2))
    return decoded_data

if __name__ == "__main__":
    image_path = 'example_image.png'
    secret_data = 'jhbdHYEFjhbffdbkj'
    image = load_image(image_path)
    encoded_image = encode_data(image, secret_data)
    cv2.imwrite('encoded_image.png', encoded_image)
    decoded_data = decode_data(encoded_image)
    print('Decoded data:', decoded_data)
