import { motion } from "motion/react";
import { Shield, Lock, Eye } from "lucide-react";

interface LoadingOverlayProps {
  show: boolean;
  mode: 'encode' | 'decode';
}

export function LoadingOverlay({ show, mode }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900/90 border border-gray-700 rounded-2xl p-8 flex flex-col items-center gap-6 max-w-sm mx-4 backdrop-blur-sm"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
      >
        {/* Animated Icon */}
        <motion.div
          className="relative w-20 h-20 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" />
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {mode === 'encode' ? (
              <Lock className="w-6 h-6 text-white" />
            ) : (
              <Eye className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </motion.div>
        
        <div className="text-center">
          <h3 className="text-white text-xl font-bold mb-2">
            {mode === 'encode' ? 'Securing Your Data...' : 'Revealing Hidden Data...'}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {mode === 'encode' 
              ? 'Embedding your secret message invisibly within the image using advanced steganography.'
              : 'Analyzing the image to extract any hidden information embedded within.'
            }
          </p>
        </div>
        
        {/* Processing Steps */}
        <div className="w-full space-y-3">
          {[
            { step: mode === 'encode' ? 'Encrypting message' : 'Scanning pixels', delay: 0 },
            { step: mode === 'encode' ? 'Embedding data' : 'Extracting data', delay: 0.5 },
            { step: mode === 'encode' ? 'Finalizing image' : 'Decrypting message', delay: 1 }
          ].map(({ step, delay }, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay, duration: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay }}
              />
              <span className="text-gray-300">{step}...</span>
            </motion.div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>

        {/* Security Notice */}
        <motion.div
          className="flex items-center gap-2 text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Shield className="w-3 h-3" />
          <span>AES-256 encryption active</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}