import { motion } from "motion/react";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

interface HeaderProps {
  mode: 'encode' | 'decode';
  onModeChange: (mode: 'encode' | 'decode') => void;
  onHome?: () => void;
}

export function Header({ mode, onModeChange, onHome }: HeaderProps) {
  
  const scrollToDropzone = () => {
    const dropzoneSection = document.querySelector('[data-dropzone]');
    if (dropzoneSection) {
      dropzoneSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const handleModeChangeWithScroll = (newMode: 'encode' | 'decode') => {
    onModeChange(newMode);
    setTimeout(() => {
      scrollToDropzone();
    }, 300);
  };

  return (
    <motion.header 
      className="w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.button 
            onClick={onHome}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="w-5 h-5 text-gray-900" />
            </motion.div>
            <motion.span 
              className="text-white text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              InvisiData
            </motion.span>
          </motion.button>

          {/* Navigation - Always visible */}
          <nav className="flex items-center gap-4 sm:gap-6">
            <motion.button
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                mode === 'encode' 
                  ? 'text-cyan-400 bg-cyan-400/10' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => handleModeChangeWithScroll('encode')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Encode
            </motion.button>
            <motion.button
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                mode === 'decode' 
                  ? 'text-cyan-400 bg-cyan-400/10' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => handleModeChangeWithScroll('decode')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Decode
            </motion.button>
          </nav>

        </div>
      </div>
    </motion.header>
  );
}