import { useState, useEffect, useRef } from "react";

const useElementWidth = () => {
  const [element, setElement] = useState(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return [setElement, width];
};

export default useElementWidth;