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
          relative rounded-2xl border-2 border-dashed transition-all duration-300
          ${isDragOver 
            ? 'border-cyan-400 bg-cyan-400/5 shadow-lg shadow-cyan-400/20' 
            : 'border-gray-600 bg-gray-800/30'
          }
          ${disabled ? 'opacity-50 pointer-events-none' : 'hover:border-cyan-400/50 hover:bg-gray-800/50'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isDragOver ? 'dragover' : 'normal'}
              className="flex flex-col items-center gap-6 max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Upload Icon with pulse effect */}
              <motion.div
                className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isDragOver 
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400' 
                    : 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`w-10 h-10 ${isDragOver ? 'text-cyan-400' : 'text-gray-400'} transition-colors duration-300`}
                  animate={isDragOver ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isDragOver ? Infinity : 0 }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </motion.div>
                
                {/* Pulse rings when dragging */}
                {isDragOver && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30"
                      animate={{ scale: [1, 2], opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                  </>
                )}
              </motion.div>

              <div className="text-center space-y-3">
                <h3 className="text-white text-xl sm:text-2xl font-bold">
                  {isDragOver ? "Drop your image here" : title}
                </h3>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
                  {subtitle}
                </p>
                
                {/* Supported formats */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-2 text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP'].map((format) => (
                    <span key={format} className="px-2 py-1 bg-gray-800 rounded border border-gray-700">
                      {format}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <motion.label
            className="group relative bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-xl font-bold text-base cursor-pointer hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center border border-gray-600 hover:border-gray-500 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">📁</span>
            Browse Files
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled}
              title="Input File"
            />
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.label>
        </div>
      </div>
    </motion.div>
  );
}