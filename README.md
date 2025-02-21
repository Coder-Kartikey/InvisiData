# InvisiData

## Overview

InvisiData is a steganography tool that allows you to hide secret data within images. This project provides functions for encoding and decoding data within PNG images using the least significant bit (LSB) method.

## Features

-   **Encoding:** Encodes secret text data into an image.
-   **Decoding:** Decodes hidden text data from an image.

## Usage

1.  **Import the `steganography.py` module:**

    ```python
    import steganography
    ```

2.  **Load an image:**

    ```python
    image = steganography.load_image('example_image.png')
    ```

3.  **Encode data into the image:**

    ```python
    encoded_image = steganography.encode_data(image, 'Secret message')
    ```

4.  **Save the encoded image:**

    ```python
    cv2.imwrite('encoded_image.png', encoded_image)
    ```

5.  **Decode data from the encoded image:**

    ```python
    decoded_data = steganography.decode_data(encoded_image)
    print('Decoded data:', decoded_data)
    ```

## Example

```python
import cv2
import steganography
```

# Load the image
```
image = steganography.load_image('example_image.png')
```

# Encode the data
```
secret_data = 'This is a secret message!'
encoded_image = steganography.encode_data(image, secret_data)
cv2.imwrite('encoded_image.png', encoded_image)
```

# Decode the data
```
decoded_data = steganography.decode_data(encoded_image)
print('Decoded data:', decoded_data)
```

## Dependencies

-cv2 (OpenCV)\
-numpy

### Install the dependencies using pip:
```
pip install opencv-python numpy
```

## File Descriptions

-steganography.py: Contains the functions for loading, encoding, and decoding data within images.\
-example_image.png: An example image file used for testing.\
-encoded_image.png: The output image file with the encoded data.\
-README.md: This file, providing an overview and instructions for using the project.\

## Contributing

Feel free to contribute to the project by submitting pull requests, reporting issues, or suggesting improvements.

# Author

CoderKP
