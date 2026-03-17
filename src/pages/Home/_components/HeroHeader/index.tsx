"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Gift } from "lucide-react";
import React, { useRef } from "react";

import { CountdownTimer } from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/siteConfig";

import { WatercolorFlower1, WatercolorFlower2, WatercolorLeaf } from "./icon";

export const HeroHeader: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="inicio"
      ref={containerRef}
    >
      <div className="absolute inset-0 gradient-bg" />

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="absolute -top-10 -left-10 w-48 md:w-72 lg:w-96"
        initial={{ opacity: 0, x: -50 }}
        style={{ y: y1, rotate: rotate1, scale: scale1, opacity }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <WatercolorFlower1 className="w-full h-full text-secondary" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-20 left-16 md:left-24 w-24 md:w-32 lg:w-40"
        initial={{ opacity: 0, scale: 0.5 }}
        style={{ y: y2, rotate: rotate2, opacity }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <WatercolorFlower2 className="w-full h-full text-muted" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, rotate: -15 }}
        className="absolute top-32 -left-4 w-16 md:w-24 lg:w-32"
        initial={{ opacity: 0, rotate: -30 }}
        style={{ y: y3, opacity }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <WatercolorLeaf className="w-full h-full text-accent" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="absolute -top-16 -right-16 w-40 md:w-56 lg:w-72"
        initial={{ opacity: 0, x: 50 }}
        style={{ y: y2, rotate: rotate2, opacity }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <WatercolorFlower2 className="w-full h-full text-muted" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, rotate: 20 }}
        className="absolute top-24 right-8 md:right-16 w-12 md:w-20 lg:w-28"
        initial={{ opacity: 0, rotate: 30 }}
        style={{ y: y4, rotate: rotate1, opacity }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <WatercolorLeaf className="w-full h-full text-accent" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-32 -left-8 w-32 md:w-48 lg:w-64"
        initial={{ opacity: 0, y: 50 }}
        style={{ y: y4, rotate: rotate1, opacity }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <WatercolorFlower2 className="w-full h-full text-secondary" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, rotate: 10 }}
        className="absolute bottom-16 left-20 md:left-32 w-20 md:w-28"
        initial={{ opacity: 0, rotate: -20 }}
        style={{ y: y3, rotate: rotate2, opacity }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <WatercolorLeaf className="w-full h-full text-accent" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, x: 0, y: 0 }}
        className="absolute -bottom-12 -right-12 w-56 md:w-72 lg:w-96"
        initial={{ opacity: 0, x: 50, y: 50 }}
        style={{ y: y1, rotate: rotate2, scale: scale1, opacity }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <WatercolorFlower1 className="w-full h-full text-secondary" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bottom-24 right-24 md:right-40 w-24 md:w-36"
        initial={{ opacity: 0, scale: 0.5 }}
        style={{ y: y2, opacity }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <WatercolorFlower2 className="w-full h-full text-muted" />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, rotate: 25 }}
        className="absolute bottom-48 right-8 w-16 md:w-24"
        initial={{ opacity: 0, rotate: 45 }}
        style={{ y: y4, rotate: rotate1, opacity }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <WatercolorLeaf className="w-full h-full text-accent" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        className="absolute top-1/4 left-1/4 w-8 md:w-12 opacity-30"
        style={{ y: y3 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-full h-full text-secondary"
          fill="currentColor"
          viewBox="0 0 50 50"
        >
          <circle cx="25" cy="25" opacity="0.4" r="20" />
        </svg>
      </motion.div>

      <motion.div
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        animate={{ y: [0, 12, 0] }}
        className="absolute top-1/3 right-1/4 w-6 md:w-10 opacity-25"
        style={{ y: y2 }}
      >
        <svg
          className="w-full h-full text-accent"
          fill="currentColor"
          viewBox="0 0 50 50"
        >
          <circle cx="25" cy="25" opacity="0.5" r="18" />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-2xl md:text-3xl lg:text-4xl text-secondary mb-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {SITE_CONFIG.hero.blessing}
        </motion.p>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-primary mb-4"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {SITE_CONFIG.couple.person1}
          <span className="text-secondary mx-2 md:mx-4">&</span>
          {SITE_CONFIG.couple.person2}
        </motion.h1>

        <motion.div
          animate={{ opacity: 1, scaleX: 1 }}
          className="flex items-center justify-center gap-4 my-8"
          initial={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="h-px w-16 md:w-24 bg-linear-to-r from-transparent to-secondary" />
          <span className="text-secondary text-3xl">✿</span>
          <div className="h-px w-16 md:w-24 bg-linear-to-l from-transparent to-secondary" />
        </motion.div>

        <motion.p
          animate={{ opacity: 1 }}
          className="font-serif text-xl md:text-2xl text-foreground/80 mb-12"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {SITE_CONFIG.wedding.dateFormatted}
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Faltam para o grande dia
          </p>
          <CountdownTimer />
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            className="btn-wedding min-w-[200px]"
            onClick={() => handleScroll("#detalhes")}
          >
            <Calendar className="w-4 h-4" />
            Ver detalhes do casamento
          </Button>
          <Button
            className="btn-wedding-outline min-w-[200px]"
            onClick={() => handleScroll("#presentes")}
            variant="outline"
          >
            <Gift className="w-4 h-4" />
            Ir para a lista de presentes
          </Button>
        </motion.div>
      </div>

      <motion.div
        transition={{
          opacity: { duration: 0.5, delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-secondary/50 flex items-start justify-center p-2">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            className="w-1.5 h-3 rounded-full bg-secondary/50"
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
