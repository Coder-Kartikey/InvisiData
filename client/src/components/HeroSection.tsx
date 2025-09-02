import { motion } from "motion/react";
import { GlitchText } from "./GlitchText";

export function HeroSection() {
  return (
    <motion.section
      className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#122117] via-[#1a2e1f] to-[#0f1812] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1739343338040-2dae68f6bdf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTY3NTUzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#122117]/90 via-[#122117]/70 to-[#122117]/90" />
      </div>

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 224, 122, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 224, 122, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#38e07a] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Main headline with glitch effect */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 bg-[#38e07a]/20 border border-[#38e07a]/30 rounded-full text-[#38e07a] text-sm md:text-base font-medium mb-6">
                🔒 Advanced Steganography Technology
              </span>
            </motion.div>
            
            <GlitchText 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
            >
              Hide Your Secrets
            </GlitchText>
            
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-gradient-to-r from-[#38e07a] to-[#96c4a8] bg-clip-text leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Within Images
            </motion.h2>
          </div>
          
          {/* Description */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-[#96c4a8] max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Securely embed sensitive information within images using cutting-edge steganography algorithms. 
            Your data remains invisible to the naked eye but easily retrievable with InvisiData.
          </motion.p>
          
          {/* Feature highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              "🛡️ Military-grade encryption",
              "⚡ Lightning-fast processing", 
              "🎯 Zero visual degradation"
            ].map((feature, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(56, 224, 122, 0.1)",
                  borderColor: "rgba(56, 224, 122, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.button
              className="group relative bg-[#38e07a] text-[#122117] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#38e07a]/90 transition-all duration-300 shadow-lg shadow-[#38e07a]/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(56, 224, 122, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Encoding</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#38e07a] to-[#2bc065] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="button-bg"
              />
            </motion.button>
            
            <motion.button
              className="group px-8 py-4 rounded-full text-lg font-bold text-white border-2 border-white/20 hover:border-[#38e07a]/50 hover:text-[#38e07a] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
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

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#122117] to-transparent" />
    </motion.section>
  );
}