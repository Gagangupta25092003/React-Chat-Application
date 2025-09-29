import { useCallback, useRef, useState } from 'react';

export const useHandleToolTip = () => {
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + rect.height / 2, // vertical middle
        left: rect.right + 8, // a little offset to the right
      });
      setHovered(true);
    }
  }, [buttonRef]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTooltipPos(null);
  }, []);

  return { hovered, tooltipPos, buttonRef, handleMouseEnter, handleMouseLeave };
};
