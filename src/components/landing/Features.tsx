import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verifiable Certificates",
    description: "Every credential is cryptographically secured and instantly verifiable by anyone, anywhere.",
  },
  {
    icon: Award,
    title: "Blockchain-backed Trust",
    description: "Immutable records on the blockchain ensure authenticity and prevent fraud.",
  },
  {
    icon: Users,
    title: "Universal Edu Identity",
    description: "One secure identity for all your educational achievements across institutions.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why EduAuth?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform how educational credentials are issued, stored, and verified
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-feature border border-border shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
