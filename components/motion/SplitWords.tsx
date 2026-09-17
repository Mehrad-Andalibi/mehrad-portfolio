import type { CSSProperties } from "react";

type Props = {
  text: string;
  /** index to start the stagger from, so a second line continues the first */
  offset?: number;
  className?: string;
};

/**
 * Wraps each word in a clipping span so headlines can slide up word by word.
 * The animation itself is CSS (see .split-word in globals.css) and is switched
 * on by an ancestor with data-active="true" or the .split-play class.
 * Screen readers get the plain sentence through aria-label.
 */
export default function SplitWords({ text, offset = 0, className }: Props) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="split-word">
            <span style={{ "--i": i + offset } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
