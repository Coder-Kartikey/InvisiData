import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FileDropzone } from "./components/FileDropzone";
import { SubmittedImageStatus } from "./components/SubmittedImageStatus";
import { SecretMessageInput } from "./components/SecretMessageInput";
import { ProcessedImage } from "./components/ProcessedImage";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { ParticleBackground } from "./components/ParticleBackground";
import { Footer } from "./components/Footer";

type Mode = 'encode' | 'decode';
type ProcessingState = 'idle' | 'processing' | 'completed';

// Mock Encode API
const mockEncodeAPI = async (imageFile: File, message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Return the same image URL (in real app, this would be the processed image)
  return URL.createObjectURL(imageFile);
};

// Actual Encode API
const encodeAPI = async (imageFile: File, message: string): Promise<Blob> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('message', message);

  const response = await fetch('https://invisidata.onrender.com/encode', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Encoding failed');
  return await response.blob();
  // Assuming backend returns the processed image as a blob
  // const blob = await response.blob();
  // return URL.createObjectURL(blob);
};

// Mock Decode API
const mockDecodeAPI = async (imageFile: File): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Return mock decoded message
  const messages = [
    "This is a secret message hidden in the image!",
    "Confidential: Meeting at 3 PM tomorrow.",
    "The password is: SecureKey123",
    "Project Alpha is approved for next phase."
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Actual Decode API
const decodeAPI = async (imageFile: File): Promise<{ message: string, imageUrl: string }> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch('https://invisidata.onrender.com/decode', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Decoding failed');
  const data = await response.json();
  // data should have { message: string, image: base64 or url }
  return {
    message: data.message,
    imageUrl: data.imageUrl // or construct from base64 if needed
  };
};

export default function App() {
  const [mode, setMode] = useState<Mode>('encode');
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [secretMessage, setSecretMessage] = useState('');
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);

  const textInputRef = useRef<HTMLDivElement>(null);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setProcessingState('idle');
    setSelectedFile(null);
    setSecretMessage('');
    setProcessedImageUrl(null);
    setDecodedMessage(null);
    setShowHero(newMode === 'encode' && !selectedFile);
  }, [selectedFile]);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setShowHero(false);
    setProcessingState('idle');
    setProcessedImageUrl(null);
    setDecodedMessage(null);

    // Auto-scroll to text input if in encode mode
    if (mode === 'encode') {
      setTimeout(() => {
        textInputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Focus the textarea
        const textarea = textInputRef.current?.querySelector('textarea');
        if (textarea) {
          textarea.focus();
        }
      }, 300);
    }
  }, [mode]);

  const handleProcess = async () => {
    if (!selectedFile) return;

    setProcessingState('processing');

    try {
      if (mode === 'encode') {
        // For Mock API
        // const processedUrl = await mockEncodeAPI(selectedFile, secretMessage);
        // setProcessedImageUrl(processedUrl);

        // For Actual API
        const processedBlob = await encodeAPI(selectedFile, secretMessage);
        setProcessedBlob(processedBlob); // Store blob for download
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(processedUrl); // Store URL for display
        // const processedUrl = await encodeAPI(selectedFile, secretMessage);
        setProcessedImageUrl(processedUrl);
        setDecodedMessage(null);
      } else {
        // For Mock API
        // const processedUrl = URL.createObjectURL(selectedFile);
        // const decoded = await mockDecodeAPI(selectedFile);
        // setProcessedImageUrl(processedUrl);
        // setDecodedMessage(decoded);

        // For Actual API
        const result = await decodeAPI(selectedFile);
        setProcessedImageUrl(result.imageUrl || URL.createObjectURL(selectedFile));
        setDecodedMessage(result.message);
      }
      setProcessingState('completed');

      // Auto-scroll to results when processing is complete 
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);
    } catch (error) {
      console.error('Processing failed:', error);
      setProcessingState('idle');
    }
  };

  const handleDownload = (blob: Blob) => {
    // if (processedImageUrl) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = mode === 'encode' ? 'encoded-image.png' : 'decoded-image.png';
    link.click();
    URL.revokeObjectURL(url);
    // }
  };

  const scrollToDropzone = () => {
    const dropzoneSection = document.querySelector('[data-dropzone]');
    if (dropzoneSection) {
      dropzoneSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleReset = () => {
    setProcessingState('idle');
    setSelectedFile(null);
    setSecretMessage('');
    setProcessedImageUrl(null);
    setDecodedMessage(null);
    setShowHero(mode === 'encode');

    // Scroll to dropzone after reset
    setTimeout(() => {
      scrollToDropzone();
    }, 300);
  };

  const handleResubmitImage = () => {
    setSelectedFile(null);
    setProcessingState('idle');
    setProcessedImageUrl(null);
    setDecodedMessage(null);
    setSecretMessage('');
    setShowHero(mode === 'encode');
  };

  const handleHome = () => {
    setMode('encode');
    setProcessingState('idle');
    setSelectedFile(null);
    setSecretMessage('');
    setProcessedImageUrl(null);
    setDecodedMessage(null);
    setShowHero(true);

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartHiding = () => {
    setMode('encode');
    setShowHero(false);
    setTimeout(() => {
      scrollToDropzone();
    }, 300);
  };

  const handleDecodeData = () => {
    setMode('decode');
    setShowHero(false);
    setTimeout(() => {
      scrollToDropzone();
    }, 300);
  };

  const getButtonText = () => {
    if (processingState === 'processing') return 'Processing...';
    if (processingState === 'completed') return 'Download';
    return mode === 'encode' ? 'Encode' : 'Decode';
  };

  const canProcess = selectedFile && (mode === 'decode' || secretMessage.trim());

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Header mode={mode} onModeChange={handleModeChange} onHome={handleHome} />

        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {showHero && mode === 'encode' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroSection onStartHiding={handleStartHiding} onDecodeData={handleDecodeData} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <div className="max-w-4xl w-full flex flex-col space-y-8">

              {/* Mode Title */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
                  key={mode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {mode === 'encode' ? 'Encode Your Message' : 'Decode Hidden Data'}
                </motion.h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                  {mode === 'encode'
                    ? 'Securely hide your secret message within an image using advanced steganography techniques.'
                    : 'Upload an image to extract and reveal any hidden data embedded within it.'
                  }
                </p>
              </motion.div>

              {/* File Upload Section */}
              <AnimatePresence mode="wait">
                {!selectedFile || processingState === 'completed' ? (
                  <motion.div
                    key="file-dropzone"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileDropzone
                      onFileSelect={handleFileSelect}
                      title={`Drag and drop your image here`}
                      subtitle={mode === 'encode' ? "Or select from your system memory" : "Or click to select a file from your computer"}
                      disabled={processingState === 'processing'}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="submitted-status"
                    data-dropzone
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SubmittedImageStatus
                      fileName={selectedFile.name}
                      onResubmit={handleResubmitImage}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secret Message Input (Encode Mode Only) */}
              <AnimatePresence>
                {mode === 'encode' && selectedFile && processingState !== 'completed' && (
                  <motion.div
                    ref={textInputRef}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SecretMessageInput
                      value={secretMessage}
                      onChange={setSecretMessage}
                      disabled={processingState === 'processing'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Process Button */}
              <AnimatePresence>
                {selectedFile && processingState !== 'completed' && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.button
                      onClick={handleProcess}
                      disabled={!canProcess || processingState === 'processing'}
                      className={`
                      px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg
                      ${canProcess && processingState !== 'processing'
                          ? 'bg-cyan-500 text-gray-900 hover:bg-cyan-400 shadow-cyan-500/25'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-none'
                        }
                    `}
                      whileHover={canProcess && processingState !== 'processing' ? {
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
                      } : {}}
                      whileTap={canProcess && processingState !== 'processing' ? { scale: 0.95 } : {}}
                    >
                      {processingState === 'processing' && (
                        <motion.div
                          className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      {getButtonText()}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Processed Image */}
              <ProcessedImage
                imageUrl={processedImageUrl || ''}
                mode={mode}
                onDownload={() => processedBlob && handleDownload(processedBlob)}
                decodedMessage={decodedMessage ?? undefined}
                show={processingState === 'completed' && !!processedImageUrl}
              />

              {/* Reset Button */}
              <AnimatePresence>
                {processingState === 'completed' && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.button
                      onClick={handleReset}
                      className="bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Process New Image
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <LoadingOverlay show={processingState === 'processing'} mode={mode} />
    </div>
  );
}