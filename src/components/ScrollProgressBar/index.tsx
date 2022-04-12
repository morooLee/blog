import React, { useEffect, useRef, useState } from 'react';

interface Props {}
export default function ScrollProgressBar({}: Props) {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const scrollPercentRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop === 0) {
        setScrollPercent(0);
        return;
      }

      const maxScrollY: number = scrollHeight - clientHeight;
      const currentScrollY = scrollTop || document.body.scrollTop;
      const currentScrollPer = Math.round((currentScrollY / maxScrollY) * 100);

      if (Math.abs(scrollPercentRef.current - currentScrollPer) > 1) {
        scrollPercentRef.current = currentScrollPer;
        setScrollPercent(currentScrollPer);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <progress
      value={scrollPercent}
      max="100"
      className="fixed top-16 w-full h-[3px] z-50"
    />
  );
}
