import { motion } from "motion/react";
import { forwardRef } from "react";

interface SecretMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const SecretMessageInput = forwardRef<HTMLDivElement, SecretMessageInputProps>(
  ({ value, onChange, disabled }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: disabled ? 0 : 1, y: disabled ? -20 : 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-white text-xl font-bold mb-3">Your Secret Message</h3>
          <p className="text-gray-400 text-base">Enter the confidential data you want to embed invisibly within the image</p>
        </div>
        
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your secret message here... This could be passwords, private notes, confidential data, or any text you want to hide."
            className="w-full h-36 sm:h-40 bg-gray-800/50 border border-gray-600 rounded-xl p-6 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-base backdrop-blur-sm"
            disabled={disabled}
            maxLength={2000}
          />
          
          {/* Character counter */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className={`text-xs font-medium ${
              value.length > 1800 ? 'text-orange-400' : 
              value.length > 0 ? 'text-cyan-400' : 'text-gray-500'
            }`}>
              {value.length}/2000
            </span>
          </div>

          {/* Focus ring effect */}
          <div className="absolute inset-0 rounded-xl border border-cyan-400/0 group-focus-within:border-cyan-400/50 transition-all duration-300 pointer-events-none" />
        </motion.div>
        
        {/* Status indicator */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {value.length > 0 ? (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              Message ready for encoding
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-full text-gray-400 text-sm">
              <div className="w-2 h-2 bg-gray-500 rounded-full" />
              Waiting for message input
            </div>
          )}
        </motion.div>

        {/* Security notice */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            🔒 Your message will be encrypted with AES-256 before embedding
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
});

SecretMessageInput.displayName = 'SecretMessageInput';