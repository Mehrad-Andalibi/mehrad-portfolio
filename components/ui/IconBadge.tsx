import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  tone?: "accent" | "signal" | "ink";
  /** stagger step for the pop-in (see useReveal) */
  pop?: number;
  className?: string;
};

const SIZES = {
  sm: "h-9 w-9 rounded-[11px] [&_svg]:h-[18px] [&_svg]:w-[18px]",
  md: "h-12 w-12 rounded-[14px] [&_svg]:h-[22px] [&_svg]:w-[22px]",
  lg: "h-16 w-16 rounded-[19px] [&_svg]:h-7 [&_svg]:w-7",
};

const TONES = {
  accent: "text-accent bg-gradient-to-b from-white to-accent-soft",
  signal: "text-signal bg-gradient-to-b from-white to-signal-bg",
  ink: "text-surface bg-gradient-to-b from-[#3a3d40] to-ink",
};

/** Rounded-square icon tile, like an app icon, used as a section and card marker */
export default function IconBadge({ icon: Icon, size = "md", tone = "accent", pop, className = "" }: Props) {
  return (
    <span
      data-pop={pop === undefined ? undefined : pop}
      className={`inline-flex shrink-0 items-center justify-center border border-white/70 shadow-[0_1px_1px_rgb(30_32_34/0.06),0_6px_16px_-6px_rgb(30_32_34/0.25)] ${SIZES[size]} ${TONES[tone]} ${className}`}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
