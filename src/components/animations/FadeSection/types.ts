import { HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

export interface FadeSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}
