import { motion } from "motion/react";
import { useMemo, useEffect, useState } from "react";

export function ParticleBackground() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Reduce particles on mobile for better performance
  const particleCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 20 : 40;
    }
    return 40;
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 10,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
  }, [particleCount]);

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
            radial-gradient(circle at 20% 30%, rgba(56, 224, 122, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(56, 224, 122, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(56, 224, 122, 0.03) 0%, transparent 50%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(56, 224, 122, 0.03) 0%, transparent 50%),
             radial-gradient(circle at 80% 60%, rgba(56, 224, 122, 0.02) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(56, 224, 122, 0.03) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 30%, rgba(56, 224, 122, 0.02) 0%, transparent 50%),
             radial-gradient(circle at 20% 60%, rgba(56, 224, 122, 0.03) 0%, transparent 50%),
             radial-gradient(circle at 60% 80%, rgba(56, 224, 122, 0.02) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      {isVisible && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#38e07a]/30 rounded-full blur-[0.5px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -150 * particle.direction],
            x: [0, 50 * particle.direction],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Subtle grid pattern overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 224, 122, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 224, 122, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Corner light effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-[#38e07a]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-[#38e07a]/3 to-transparent rounded-full blur-3xl" />
    </div>
  );
}