import React, { useEffect, useState } from "react";
import { TextStyle } from "react-native";
import Markdown from "react-native-markdown-display";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  style?: TextStyle;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 1,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(""); // reset text when text prop changes

    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(text.slice(0, currentIndex));
      if (currentIndex === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <Markdown style={{ body: style || {} }}>{displayedText}</Markdown>;
};

export default TypewriterText;
