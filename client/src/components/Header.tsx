import { motion } from "motion/react";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

interface HeaderProps {
  mode: 'encode' | 'decode';
  onModeChange: (mode: 'encode' | 'decode') => void;
}

export function Header({ mode, onModeChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <motion.div 
            className="flex items-center gap-3"
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
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <motion.button
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  mode === 'encode' 
                    ? 'text-cyan-400 bg-cyan-400/10' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => onModeChange('encode')}
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
                onClick={() => onModeChange('decode')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Decode
              </motion.button>
              <motion.button 
                className="text-gray-400 text-sm font-medium hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                About
              </motion.button>
            </nav>
            
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              <motion.button
                className={`text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  mode === 'encode' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => {
                  onModeChange('encode');
                  setIsMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
              >
                Encode
              </motion.button>
              <motion.button
                className={`text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  mode === 'decode' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => {
                  onModeChange('decode');
                  setIsMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
              >
                Decode
              </motion.button>
              <motion.button 
                className="text-left px-4 py-3 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.button>
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-base hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 mx-2 mt-4"
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}