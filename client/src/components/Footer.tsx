import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Shield, Lock, Eye, Zap, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      className="w-full bg-gradient-to-t from-black to-gray-950 border-t border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-white text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                InvisiData
              </span>
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Leading the future of digital privacy with invisible data embedding technology. 
              Secure your sensitive information with our advanced steganography solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@invisidata.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { Icon: Twitter, href: "#", color: "hover:bg-blue-500/20 hover:text-blue-400" },
                { Icon: Github, href: "#", color: "hover:bg-gray-600/20 hover:text-gray-300" },
                { Icon: Linkedin, href: "#", color: "hover:bg-blue-600/20 hover:text-blue-400" }
              ].map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${color}`}
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
                { icon: Lock, text: "AES-256 Encryption", desc: "Military-grade security" },
                { icon: Eye, text: "Invisible Embedding", desc: "Zero visual impact" },
                { icon: Zap, text: "Instant Processing", desc: "Real-time encoding" }
              ].map(({ icon: Icon, text, desc }, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors">
                    <Icon className="w-4 h-4 mt-1 text-cyan-400" />
                    <div>
                      <span className="text-sm font-medium block">{text}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400">{desc}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <div className="space-y-3">
              {[
                { text: "About Us", desc: "Our mission & vision" },
                { text: "Careers", desc: "Join our team" },
                { text: "Blog", desc: "Latest insights" },
                { text: "Press Kit", desc: "Media resources" }
              ].map(({ text, desc }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="group block"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium">{text}</span>
                  <span className="block text-xs text-gray-500 group-hover:text-gray-400">{desc}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <div className="space-y-3">
              {[
                { text: "Documentation", desc: "API & guides" },
                { text: "Security", desc: "Privacy & safety" },
                { text: "Support", desc: "Get help" },
                { text: "Status", desc: "System health" }
              ].map(({ text, desc }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="group block"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-gray-300 hover:text-white transition-colors text-sm font-medium">{text}</span>
                  <span className="block text-xs text-gray-500 group-hover:text-gray-400">{desc}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between pt-8 mt-12 border-t border-gray-800 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
            <p>© 2024 InvisiData. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                Privacy Policy
              </motion.a>
              <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                Terms of Service
              </motion.a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}