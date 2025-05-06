// hooks/useTypewriter.ts
import { useEffect, useState } from 'react';

const TYPING_SPEED = 50;
const DELETING_SPEED = 20;
const PAUSE_TIME = 1500;

export function useTypewriter(strings: string[]) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = strings[index];
    const timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return currentText.substring(0, prev.length - 1);
        } else {
          return currentText.substring(0, prev.length + 1);
        }
      });

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), PAUSE_TIME);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % strings.length);
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, strings]);

  return displayText;
}
