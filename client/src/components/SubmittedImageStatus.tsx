import { motion } from "motion/react";
import { RefreshCw, Check, Image } from "lucide-react";

interface SubmittedImageStatusProps {
  fileName: string;
  onResubmit: () => void;
}

export function SubmittedImageStatus({ fileName, onResubmit }: SubmittedImageStatusProps) {
  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-400 rounded-xl flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <Check className="w-5 h-5 text-green-400" />
            </motion.div>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg">Image Submitted</h3>
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1 animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        {/* File Info */}
        <motion.div
          className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/50 rounded-lg flex items-center justify-center">
              <Image className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate" title={fileName}>
                {fileName}
              </p>
              <p className="text-gray-400 text-xs">Ready for processing</p>
            </div>
          </div>
        </motion.div>

        {/* Resubmit Button */}
        <motion.button
          onClick={onResubmit}
          className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-600 hover:to-gray-500 transition-all duration-300 border border-gray-600 hover:border-gray-500 flex items-center justify-center gap-2 group"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RefreshCw className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
          Choose Different Image
        </motion.button>
      </motion.div>
    </motion.div>
  );
}