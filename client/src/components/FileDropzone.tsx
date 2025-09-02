import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  title: string;
  subtitle: string;
  disabled?: boolean;
}

export function FileDropzone({ onFileSelect, title, subtitle, disabled }: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onFileSelect(imageFile);
    }
  }, [onFileSelect, disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: disabled ? 0 : 1, y: disabled ? -20 : 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`
          relative rounded-[12px] border-2 border-dashed transition-all duration-300
          ${isDragOver 
            ? 'border-[#38e07a] bg-[#38e07a]/5' 
            : 'border-[#366347]'
          }
          ${disabled ? 'opacity-50 pointer-events-none' : 'hover:border-[#38e07a]/50'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isDragOver ? 'dragover' : 'normal'}
              className="flex flex-col items-center gap-4 max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Upload Icon */}
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDragOver ? 'bg-[#38e07a]/20' : 'bg-[#264533]'
                } transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg 
                  className={`w-8 h-8 ${isDragOver ? 'text-[#38e07a]' : 'text-white'} transition-colors duration-300`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </motion.div>

              <h3 className="text-white text-lg sm:text-xl font-bold text-center">
                {isDragOver ? "Drop your image here" : title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base text-center leading-relaxed">
                {subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
          
          <motion.label
            className="bg-[#264533] text-white px-6 py-3 rounded-full font-bold text-sm sm:text-base cursor-pointer hover:bg-[#264533]/80 transition-all duration-300 flex items-center justify-center border border-white/10 hover:border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled}
            />
          </motion.label>
        </div>
      </div>
    </motion.div>
  );
}