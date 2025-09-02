import cv2
import numpy as np

def load_image(image_path):
    image = cv2.imread(image_path)
    return image

def decode_data(image):
    # binary_data = ""
    # for values in image:
    #     for pixel in values:
    #         r, g, b = format(pixel[0], '08b'), format(pixel[1], '08b'), format(pixel[2], '08b')
    #         binary_data += r[-1] + g[-1] + b[-1]

    # binary_data = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    # decoded_data = ""
    # for byte in binary_data:
    #     if byte == '11111111':
    #         break
    #     decoded_data += chr(int(byte, 2))
    # return decoded_data

    binary_data = ""
    for values in image:
        for pixel in values:
            for k in range(3):
                binary_data += str(pixel[k] & 1)
    bytes_list = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    decoded_data = ""
    i = 0
    while i < len(bytes_list) - 1:
        if bytes_list[i] + bytes_list[i+1] == '1111111111111110':
            break
        decoded_data += chr(int(bytes_list[i], 2))
        i += 1
    # Check if the last byte is part of the end marker
    if i == len(bytes_list) - 1 and bytes_list[i] != '11111111':
        decoded_data += chr(int(bytes_list[i], 2))
    return decoded_data

if __name__ == "__main__":
    # image_path = 'encoded_image.png'  # Path to the encoded image
    image_path = 'image.png'
    image = load_image(image_path)
    decoded_data = decode_data(image)
    print('Decoded data:', decoded_data)
