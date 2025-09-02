import { motion } from "motion/react";

interface SecretMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SecretMessageInput({ value, onChange, disabled }: SecretMessageInputProps) {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: disabled ? 0 : 1, y: disabled ? -20 : 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-white text-lg font-bold mb-2">Secret Message</h3>
          <p className="text-[#96c4a8] text-sm">Enter the message you want to hide within the image</p>
        </div>
        
        <motion.div
          className="relative"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your secret message here... It can be anything from passwords to confidential notes."
            className="w-full h-32 sm:h-36 bg-[#1c3024] border border-[#366347] rounded-xl p-4 sm:p-6 text-white placeholder-white/50 resize-none focus:outline-none focus:border-[#38e07a] focus:ring-2 focus:ring-[#38e07a]/20 transition-all duration-300 text-sm sm:text-base"
            disabled={disabled}
            maxLength={1000}
          />
          
          <div className="absolute bottom-3 right-3 text-xs text-white/40">
            {value.length}/1000
          </div>
        </motion.div>
        
        {value.length > 0 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[#38e07a] text-sm">
              ✓ Message ready for encoding
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}