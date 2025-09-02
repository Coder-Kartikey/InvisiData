import { motion } from "motion/react";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface ProcessedImageProps {
  imageUrl: string;
  mode: 'encode' | 'decode';
  onDownload: () => void;
  decodedMessage?: string;
  show: boolean;
}

export function ProcessedImage({ imageUrl, mode, onDownload, decodedMessage, show }: ProcessedImageProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyToClipboard = async () => {
    if (decodedMessage) {
      try {
        await navigator.clipboard.writeText(decodedMessage);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    }
  };

  if (!show) return null;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      id="results-section"
    >
      <motion.div
        className="bg-gray-800/50 border border-gray-600 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-5 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                {mode === 'encode' ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Encoding Complete
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    Message Extracted
                  </>
                )}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {mode === 'encode' 
                  ? 'Your secret data has been invisibly embedded into the image'
                  : 'Hidden content has been successfully extracted from the image'
                }
              </p>
            </div>
            
            <motion.button
              onClick={onDownload}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              📥 Download
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Image Preview */}
          <motion.div
            className="flex-1 p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-600 shadow-lg">
              <img
                src={imageUrl}
                alt="Processed image"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Processing complete
              </div>
              <span className="text-gray-400">Quality: 100%</span>
            </div>
          </motion.div>
          
          {/* Content Area */}
          <div className="flex-1 p-6">
            {mode === 'encode' ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="bg-gray-900 rounded-xl p-5 border border-gray-700">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    🔐 Encoding Summary
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400 font-medium">✓ Successfully Encoded</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Algorithm:</span>
                      <span className="text-white">LSB Steganography</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Encryption:</span>
                      <span className="text-white">AES-256</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Visual Change:</span>
                      <span className="text-white">0% (Invisible)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-green-400 text-sm leading-relaxed">
                    ✓ Your secret message is now perfectly hidden within the image. 
                    The image appears completely normal while containing your encrypted data.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h4 className="text-white font-bold flex items-center gap-2">
                  🔓 Extracted Message
                </h4>
                
                <motion.div
                  className="bg-gray-900 border border-gray-700 rounded-xl p-5 max-h-48 overflow-y-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  {decodedMessage ? (
                    <div className="space-y-4">
                      <p className="text-white text-sm leading-relaxed break-words bg-gray-800 p-3 rounded-lg border border-gray-600">
                        {decodedMessage}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-cyan-400 text-xs font-medium">Message successfully decrypted</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-3">🔍</div>
                      <p className="text-gray-400 text-sm">
                        No hidden message detected in this image.
                      </p>
                    </div>
                  )}
                </motion.div>
                
                {decodedMessage && (
                  <motion.button
                    className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center justify-center gap-2 ${
                      isCopied 
                        ? 'bg-green-600 text-white border-green-500 hover:bg-green-500' 
                        : 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopyToClipboard}
                    initial={false}
                    animate={{
                      backgroundColor: isCopied ? '#16a34a' : '#374151',
                      borderColor: isCopied ? '#22c55e' : '#4b5563'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: isCopied ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </motion.div>
                    {isCopied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}