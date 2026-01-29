import { HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}
