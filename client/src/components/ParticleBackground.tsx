import { motion } from "motion/react";
import { useMemo, useEffect, useState } from "react";

export function ParticleBackground() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Reduce particles on mobile for better performance
  const particleCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 15 : 30;
    }
    return 30;
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, [particleCount]);

  // Binary matrix effect particles
  const matrixParticles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      chars: ['0', '1', '01', '10', '110', '101', '011'],
    }));
  }, []);

  // Pause animations when tab is not visible for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.02) 0%, transparent 50%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.02) 0%, transparent 50%)`,
            `radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
             radial-gradient(circle at 25% 75%, rgba(147, 51, 234, 0.03) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.02) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Floating data particles */}
      {isVisible && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400/20 rounded-full blur-[0.5px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -200],
            opacity: [0, particle.opacity, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Digital matrix rain effect */}
      {isVisible && matrixParticles.map((particle) => (
        <motion.div
          key={`matrix-${particle.id}`}
          className="absolute text-cyan-400/30 text-xs font-mono"
          style={{
            left: `${particle.x}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '105vh'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.chars[Math.floor(Math.random() * particle.chars.length)]}
        </motion.div>
      ))}
      
      {/* Subtle hexagonal grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(150deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px, 0px 0px, 0px 0px', '80px 80px, 80px 80px, 40px 40px']
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Corner light effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/3 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-blue-500/2 to-transparent rounded-full blur-3xl" />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{
          y: ['0vh', '100vh'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}