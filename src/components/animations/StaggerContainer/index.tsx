import { motion } from "framer-motion";
import React from "react";

import { StaggerContainerProps } from "./types";

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className,
  ...props
}) => {
  return (
    <motion.div
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = motion.div;
