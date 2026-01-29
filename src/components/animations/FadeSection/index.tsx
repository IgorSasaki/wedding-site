import { motion } from "framer-motion";
import React from "react";

import { DIRECTION_VARIANTS } from "./data";
import { FadeSectionProps } from "./types";

export const FadeSection: React.FC<FadeSectionProps> = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
  ...props
}) => {
  const initialPosition = DIRECTION_VARIANTS[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPosition,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      className={className}
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
