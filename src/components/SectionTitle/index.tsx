import { cn } from "@/lib/utils";

import { SectionTitleProps } from "./types";

export const SectionTitle = ({
  title,
  subtitle,
  className,
  decorated = true,
}: SectionTitleProps) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className="section-title">{title}</h2>

      {decorated && (
        <div className="decorative-divider">
          <span className="text-secondary text-2xl">✿</span>
        </div>
      )}

      {subtitle && (
        <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};
