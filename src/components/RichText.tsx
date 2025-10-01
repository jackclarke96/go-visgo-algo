import { ReactNode } from "react";

interface RichTextProps {
  content: string;
}

export const RichText = ({ content }: RichTextProps) => {
  const parseInlineFormatting = (text: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let currentIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }
      // Add the bold text
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return <>{parseInlineFormatting(content)}</>;
};
