import { TimelineEvent } from "@/config/timelineConfig";

export interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}
