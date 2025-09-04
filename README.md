# InvisiData

![InvisiData Banner](https://github.com/Coder-Kartikey/InvisiData/blob/main/image.png) <!-- Custom banner image path if available -->

## Overview

**InvisiData** is a robust steganography solution for cybersecurity, allowing users to securely hide sensitive information within images using advanced techniques. With support for invisible data embedding and military-grade encryption, InvisiData helps protect privacy in personal and professional digital communication.

## Features

- **AES-256 Encryption:** Military-grade security for embedded data.
- **Invisible Embedding:** Zero visual impact—hidden data is undetectable to the naked eye.
- **Instant Processing:** Real-time encoding and decoding for fast operations.
- **Dual API Support:** Easy-to-use Python and REST API endpoints.
- **User-Friendly Web Interface:** Modern React web app for encoding and decoding images.

## Technologies Used

- **Backend:** Python (Flask), OpenCV, NumPy
- **Frontend:** TypeScript, React, Tailwind CSS, Framer Motion
- **Steganography Algorithms:** LSB (Least Significant Bit) Method
- **Security:** AES-256 Encryption (planned/partial)
- **APIs:** RESTful endpoints for image encoding/decoding

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js & npm (for frontend)
- pip (Python package manager)

### Backend Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Coder-Kartikey/InvisiData.git
    cd InvisiData/server
    ```
2. Install dependencies:
    ```bash
    pip install opencv-python numpy flask flask-cors
    ```
3. Run the server:
    ```bash
    python app.py
    ```

### Frontend Installation

1. Navigate to the client directory:
    ```bash
    cd ../client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the app:
    ```bash
    npm start
    ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Python Library

```python
import steganography
import cv2

# Load the image
image = steganography.load_image('example_image.png')

# Encode the data
secret_data = 'This is a secret message!'
encoded_image = steganography.encode_data(image, secret_data)
cv2.imwrite('encoded_image.png', encoded_image)

# Decode the data
decoded_data = steganography.decode_data(encoded_image)
print('Decoded data:', decoded_data)
```

### REST API

- **Encode:** `POST /encode` with form-data (`image`, `message`)
- **Decode:** `POST /decode` with form-data (`image`)

### Web App

- Upload an image, enter your secret message, and click "Encode".
- Download the processed image or use "Decode" to extract hidden messages.

## File Structure

- `/server/app.py`: Flask backend & APIs.
- `/server/steganography.py`: Core encoding/decoding logic.
- `/client/`: React frontend for user interaction.
- `/client/public/index.html`: Web app entry point.
- `/client/src/App.tsx`: Main app logic for encoding/decoding.
- `/assets/`: Image assets and banners (if available).

## Example Images

- `example_image.png`: Test image for encoding.
- `encoded_image.png`: Output image with hidden data.

## Contributing

We welcome contributions! Please open issues for bugs or feature requests, and submit pull requests to improve the project.

## Author

Built and maintained by [CoderKP](https://github.com/Coder-Kartikey).  
Contact: pkartikey5757@gmail.com

## License

This project currently does not specify a license. If you wish to use it for commercial purposes, please contact me
---

**Leading the future of digital privacy with invisible data embedding technology. Secure your sensitive information with our advanced steganography solutions.**
