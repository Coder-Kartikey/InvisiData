import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      
      {isGlitching && (
        <>
          <motion.span
            className={`absolute inset-0 text-cyan-400 ${className}`}
            style={{ clipPath: "inset(0 0 95% 0)" }}
            animate={{
              x: [0, -2, 2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
          <motion.span
            className={`absolute inset-0 text-purple-500 ${className}`}
            style={{ clipPath: "inset(85% 0 0 0)" }}
            animate={{
              x: [0, 2, -2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        </>
      )}
    </motion.div>
  );
}