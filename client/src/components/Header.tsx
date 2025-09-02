import { motion } from "motion/react";
import { useState } from "react";
import svgPaths from "../imports/svg-ytg2dkb65w.ts";
import { GlitchText } from "./GlitchText";

interface HeaderProps {
  mode: 'encode' | 'decode';
  onModeChange: (mode: 'encode' | 'decode') => void;
}

export function Header({ mode, onModeChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="w-full border-b border-[#e5e8eb]/20 bg-[#122117]/95 backdrop-blur-sm sticky top-0 z-50"
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
              className="w-6 h-6 relative"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <path 
                  clipRule="evenodd" 
                  d={svgPaths.p36445c0} 
                  fill="white" 
                  fillRule="evenodd" 
                />
              </svg>
            </motion.div>
            <GlitchText className="text-white text-lg md:text-xl font-bold">
              InvisiData
            </GlitchText>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <motion.button
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  mode === 'encode' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
                onClick={() => onModeChange('encode')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Encode
                {mode === 'encode' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38e07a]"
                    layoutId="activeTab"
                    initial={false}
                  />
                )}
              </motion.button>
              <motion.button
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  mode === 'decode' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
                onClick={() => onModeChange('decode')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Decode
                {mode === 'decode' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38e07a]"
                    layoutId="activeTab"
                    initial={false}
                  />
                )}
              </motion.button>
              <motion.span 
                className="text-white/70 text-sm font-medium cursor-pointer hover:text-white transition-colors px-3 py-2"
                whileHover={{ scale: 1.05 }}
              >
                About
              </motion.span>
            </nav>
            
            <motion.button
              className="bg-[#38e07a] text-[#122117] px-6 py-2 rounded-full text-sm font-bold hover:bg-[#38e07a]/90 transition-all duration-300 shadow-lg shadow-[#38e07a]/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(56, 224, 122, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-white hover:text-[#38e07a] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-6 flex flex-col justify-center space-y-1"
              animate={isMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-full h-0.5 bg-current origin-center"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current origin-center"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
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
          <div className="py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <motion.button
                className={`text-left px-3 py-2 text-base font-medium transition-colors ${
                  mode === 'encode' ? 'text-[#38e07a]' : 'text-white/70 hover:text-white'
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
                className={`text-left px-3 py-2 text-base font-medium transition-colors ${
                  mode === 'decode' ? 'text-[#38e07a]' : 'text-white/70 hover:text-white'
                }`}
                onClick={() => {
                  onModeChange('decode');
                  setIsMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
              >
                Decode
              </motion.button>
              <motion.span 
                className="text-white/70 text-base font-medium cursor-pointer hover:text-white transition-colors px-3 py-2"
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.span>
              <motion.button
                className="bg-[#38e07a] text-[#122117] px-6 py-3 rounded-full text-base font-bold hover:bg-[#38e07a]/90 transition-colors mx-3 mt-4"
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