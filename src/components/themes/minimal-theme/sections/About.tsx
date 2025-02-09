"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";

export default function About() {
  return (
    <Container className="py-24 sm:py-32">
      <motion.div
        className="items-center gap-12 grid md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter">
            Our Minimalist Approach
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe in the power of simplicity. Our minimalist design
            philosophy focuses on essential elements, creating clean and
            intuitive experiences that allow your content to shine.
          </p>
          <ul className="space-y-2">
            {["Clean Design", "User-Centric", "Purposeful Elements"].map(
              (item, index) => (
                <motion.li
                  key={item}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </motion.li>
              )
            )}
          </ul>
          <Button size="lg" className="mt-4">
            Learn More About Us
          </Button>
        </div>
        <div className="relative bg-muted rounded-lg h-[400px] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute inset-4 border-primary/20 border rounded"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="right-8 bottom-8 absolute bg-primary/10 rounded-full w-40 h-40"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </Container>
  );
}
