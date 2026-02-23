import { useState, useEffect } from "react";

const useIsMobile = () => {
  const mql = window.matchMedia("(max-width: 960px)");

  // 1. Start with the current value
  const [isMobile, setIsMobile] = useState(mql.matches);

  useEffect(() => {
    // 2. Update state whenever the query result changes
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);

    // 3. Clean up the listener when the component unmounts
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile; // just a boolean
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
  }, [matches, query]);
  return matches;
};

export default useIsMobile;