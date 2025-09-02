import { motion } from "motion/react";
import { Lock, Eye, Zap } from "lucide-react";

interface HeroSectionProps {
  onStartHiding?: () => void;
  onDecodeData?: () => void;
}

export function HeroSection({ onStartHiding, onDecodeData }: HeroSectionProps) {
  return (
    <motion.section
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/40 rounded-full blur-sm"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-30, 30],
                x: [-20, 20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium">
              <Lock className="w-4 h-4" />
              Military-Grade Steganography
            </span>
          </motion.div>
          
          {/* Main headline */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Hide Data in
              <motion.span 
                className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Plain Sight
              </motion.span>
            </motion.h1>
          </div>
          
          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Embed secret messages invisibly within images using advanced steganography. 
            Your data stays hidden while maintaining perfect image quality.
          </motion.p>
          
          {/* Feature highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {[
              { icon: Lock, text: "AES-256 Encryption" },
              { icon: Zap, text: "Instant Processing" }, 
              { icon: Eye, text: "Invisible to Eye" }
            ].map(({ icon: Icon, text }, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  color: "rgb(103, 232, 249)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <motion.button
              onClick={onStartHiding}
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/25 overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Hiding Data</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              onClick={onDecodeData}
              className="group px-8 py-4 rounded-xl font-bold text-lg text-gray-300 border-2 border-gray-600 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Decode Data
              <motion.span
                className="inline-block ml-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </motion.section>
  );
}