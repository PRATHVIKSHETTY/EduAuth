import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero animate-gradient-shift bg-[length:200%_200%]">
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Shield className="w-16 h-16 text-card" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-20 opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Award className="w-20 h-20 text-card" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-10 opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Users className="w-16 h-16 text-card" />
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-card mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            EduAuth
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-card/90 mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Verify. Trust. Empower Education.
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-card/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The future of educational credential verification powered by blockchain technology
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              size="lg"
              variant="hero"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6"
            >
              Login / Register
            </Button>
            <Button
              size="lg"
              variant="accent"
              onClick={() => navigate("/verify")}
              className="text-lg px-8 py-6"
            >
              Verify a Certificate
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
