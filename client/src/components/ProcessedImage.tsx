import { motion } from "motion/react";

interface ProcessedImageProps {
  imageUrl: string;
  mode: 'encode' | 'decode';
  onDownload: () => void;
  decodedMessage?: string;
  show: boolean;
}

export function ProcessedImage({ imageUrl, mode, onDownload, decodedMessage, show }: ProcessedImageProps) {
  if (!show) return null;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <motion.div
        className="bg-[#1c3024] border border-[#366347] rounded-xl overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#264533] to-[#1c3024] px-6 py-4 border-b border-[#366347]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg sm:text-xl font-bold">
                {mode === 'encode' ? '✓ Image Encoded Successfully' : '🔍 Message Decoded'}
              </h3>
              <p className="text-[#96c4a8] text-sm mt-1">
                {mode === 'encode' 
                  ? 'Your secret message has been embedded into the image'
                  : 'Hidden content has been extracted from the image'
                }
              </p>
            </div>
            
            <motion.button
              onClick={onDownload}
              className="bg-[#38e07a] text-[#122117] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#38e07a]/90 transition-all duration-300 shadow-lg shadow-[#38e07a]/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(56, 224, 122, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              Download Image
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
            <div className="aspect-video bg-[#122117] rounded-lg overflow-hidden border border-[#366347]">
              <img
                src={imageUrl}
                alt="Processed image"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-[#96c4a8]">
              <div className="w-2 h-2 bg-[#38e07a] rounded-full animate-pulse"></div>
              Processing complete
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
                <div className="bg-[#122117] rounded-lg p-4 border border-[#366347]">
                  <h4 className="text-white font-semibold mb-2">🔒 Encoding Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#96c4a8]">Status:</span>
                      <span className="text-[#38e07a]">Successfully Encoded</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#96c4a8]">Method:</span>
                      <span className="text-white">LSB Steganography</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#96c4a8]">Security:</span>
                      <span className="text-white">AES-256 Encrypted</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#38e07a]/10 border border-[#38e07a]/30 rounded-lg p-4">
                  <p className="text-[#38e07a] text-sm">
                    ✓ Your message is now securely hidden within the image. 
                    The visual quality remains unchanged while your data is protected.
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
                <h4 className="text-white font-semibold">🔓 Decoded Message</h4>
                
                <motion.div
                  className="bg-[#122117] border border-[#366347] rounded-lg p-4 max-h-48 overflow-y-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  {decodedMessage ? (
                    <div className="space-y-3">
                      <p className="text-white text-sm leading-relaxed break-words">
                        {decodedMessage}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-[#366347]">
                        <div className="w-1.5 h-1.5 bg-[#38e07a] rounded-full"></div>
                        <span className="text-[#38e07a] text-xs">Message successfully extracted</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🔍</div>
                      <p className="text-white/70 text-sm">
                        No hidden message found in this image.
                      </p>
                    </div>
                  )}
                </motion.div>
                
                {decodedMessage && (
                  <motion.button
                    className="w-full bg-[#264533] text-white py-2 px-4 rounded-lg text-sm hover:bg-[#264533]/80 transition-colors border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigator.clipboard.writeText(decodedMessage)}
                  >
                    📋 Copy Message to Clipboard
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