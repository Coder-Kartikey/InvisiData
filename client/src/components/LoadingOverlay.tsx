import { motion } from "motion/react";

interface LoadingOverlayProps {
  show: boolean;
  mode: 'encode' | 'decode';
}

export function LoadingOverlay({ show, mode }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#122117] border border-[#366347] rounded-[20px] p-8 flex flex-col items-center gap-6 max-w-sm mx-4"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
      >
        {/* Animated Logo */}
        <motion.div
          className="w-16 h-16 border-4 border-[#38e07a]/30 border-t-[#38e07a] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="text-center">
          <h3 className="text-white text-[18px] font-bold leading-[23px] mb-2">
            {mode === 'encode' ? 'Encoding Image...' : 'Decoding Image...'}
          </h3>
          <p className="text-[#96c4a8] text-[14px] leading-[21px]">
            {mode === 'encode' 
              ? 'Hiding your secret message within the image.'
              : 'Extracting hidden data from the image.'
            }
          </p>
        </div>
        
        {/* Progress Animation */}
        <div className="w-full bg-[#264533] rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#38e07a] to-[#38e07a]/70 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}