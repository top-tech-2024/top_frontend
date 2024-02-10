import React, { useState, useEffect, useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  sx?: any;
}

const useRevealOnScroll = (): [React.RefObject<HTMLElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        setVisible(rect.bottom >= 0 && rect.bottom <= windowHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [containerRef, isVisible];
};

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, sx }) => {
  const [containerRef, isVisible] = useRevealOnScroll();

  return (
    <div
      ref={containerRef}
      style={{
        width: "70%",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1.5s ease-in-out",
        marginBottom: "1rem",
        ...sx,
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
