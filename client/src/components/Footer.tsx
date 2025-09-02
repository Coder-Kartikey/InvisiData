import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Shield, Zap, Eye } from "lucide-react";
import { GlitchText } from "./GlitchText";

export function Footer() {
  return (
    <motion.footer
      className="w-full bg-gradient-to-t from-[#0f1812] to-[#122117] border-t border-[#366347]/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-[#38e07a] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#122117]" />
              </div>
              <GlitchText className="text-white text-xl font-bold">
                InvisiData
              </GlitchText>
            </motion.div>
            <p className="text-[#96c4a8] text-sm leading-relaxed mb-6">
              Advanced steganography technology for secure data hiding. 
              Protect your sensitive information with military-grade encryption.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Github, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="w-10 h-10 bg-[#264533] rounded-lg flex items-center justify-center text-[#96c4a8] hover:text-white hover:bg-[#38e07a]/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Features</h3>
            <div className="space-y-4">
              {[
                { icon: Shield, text: "Secure Encoding" },
                { icon: Eye, text: "Data Extraction" },
                { icon: Zap, text: "Fast Processing" }
              ].map(({ icon: Icon, text }, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-[#96c4a8] hover:text-white transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <div className="space-y-3">
              {["About Us", "Contact", "Careers", "Blog"].map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="block text-[#96c4a8] hover:text-white transition-colors text-sm"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
            <div className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="block text-[#96c4a8] hover:text-white transition-colors text-sm"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-[#366347]/30 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-[#96c4a8] text-sm text-center md:text-left">
            © 2024 InvisiData. All rights reserved. Built with ❤️ for security.
          </p>
          
          <div className="flex items-center gap-6">
            <motion.span 
              className="text-[#96c4a8] text-sm hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Status
            </motion.span>
            <motion.span 
              className="text-[#96c4a8] text-sm hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Support
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}