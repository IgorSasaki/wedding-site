import { MessageCardProps } from "./types";

export const MessageCard = ({ name, message, date }: MessageCardProps) => {
  return (
    <div className="watercolor-card p-5 md:p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
          <span className="text-secondary font-serif text-lg">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-serif text-primary font-medium truncate">
              {name}
            </h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {date}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
