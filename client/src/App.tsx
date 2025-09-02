import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FileDropzone } from "./components/FileDropzone";
import { SecretMessageInput } from "./components/SecretMessageInput";
import { ProcessedImage } from "./components/ProcessedImage";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { ParticleBackground } from "./components/ParticleBackground";
import { Footer } from "./components/Footer";

type Mode = 'encode' | 'decode';
type ProcessingState = 'idle' | 'processing' | 'completed';

// Mock API functions
const mockEncodeAPI = async (imageFile: File, message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Return the same image URL (in real app, this would be the processed image)
  return URL.createObjectURL(imageFile);
};

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

export default function App() {
  const [mode, setMode] = useState<Mode>('encode');
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [secretMessage, setSecretMessage] = useState('');
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);

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
  }, []);

  const handleProcess = async () => {
    if (!selectedFile) return;

    setProcessingState('processing');

    try {
      if (mode === 'encode') {
        const processedUrl = await mockEncodeAPI(selectedFile, secretMessage);
        setProcessedImageUrl(processedUrl);
      } else {
        const processedUrl = URL.createObjectURL(selectedFile);
        const decoded = await mockDecodeAPI(selectedFile);
        setProcessedImageUrl(processedUrl);
        setDecodedMessage(decoded);
      }
      setProcessingState('completed');
    } catch (error) {
      console.error('Processing failed:', error);
      setProcessingState('idle');
    }
  };

  const handleDownload = () => {
    if (processedImageUrl) {
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = mode === 'encode' ? 'encoded-image.png' : 'decoded-image.png';
      link.click();
    }
  };

  const handleReset = () => {
    setProcessingState('idle');
    setSelectedFile(null);
    setSecretMessage('');
    setProcessedImageUrl(null);
    setDecodedMessage(null);
    setShowHero(mode === 'encode');
  };

  const getButtonText = () => {
    if (processingState === 'processing') return 'Processing...';
    if (processingState === 'completed') return 'Download';
    return mode === 'encode' ? 'Encode' : 'Decode';
  };

  const canProcess = selectedFile && (mode === 'decode' || secretMessage.trim());

  return (
    <div className="min-h-screen bg-[#122117] text-white relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Header mode={mode} onModeChange={handleModeChange} />
        
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
              <HeroSection />
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
              <p className="text-[#96c4a8] text-base sm:text-lg max-w-2xl mx-auto">
                {mode === 'encode' 
                  ? 'Securely hide your secret message within an image using advanced steganography techniques.'
                  : 'Upload an image to extract and reveal any hidden data embedded within it.'
                }
              </p>
            </motion.div>

            {/* File Dropzone */}
            <FileDropzone
              onFileSelect={handleFileSelect}
              title={`Drag and drop your image here`}
              subtitle={mode === 'encode' ? "Or select from your system memory" : "Or click to select a file from your computer"}
              disabled={processingState === 'processing' || processingState === 'completed'}
            />

            {/* Secret Message Input (Encode Mode Only) */}
            <AnimatePresence>
              {mode === 'encode' && selectedFile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SecretMessageInput
                    value={secretMessage}
                    onChange={setSecretMessage}
                    disabled={processingState === 'processing' || processingState === 'completed'}
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
                        ? 'bg-[#38e07a] text-[#122117] hover:bg-[#38e07a]/90 shadow-[#38e07a]/25'
                        : 'bg-[#264533] text-white/50 cursor-not-allowed shadow-none'
                      }
                    `}
                    whileHover={canProcess && processingState !== 'processing' ? { 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(56, 224, 122, 0.4)"
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
              onDownload={handleDownload}
              decodedMessage={decodedMessage  ?? undefined}
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
                    className="bg-[#264533] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#264533]/80 transition-all duration-300 border border-white/10 hover:border-white/20"
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