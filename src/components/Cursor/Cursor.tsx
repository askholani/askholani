import { motion, useMotionValue, useSpring } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

interface CursorProps {
  isOverSection: boolean;
}

export default function Cursor({ isOverSection }: CursorProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      className="z-50"
      style={{
        position: "fixed",
        width: "25px",
        height: "25px",
        backgroundColor: isOverSection ? "#f1f5f9" : "#374151",
        borderRadius: "50%",
        x,
        y,
      }}
    />
  );
}

const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, springConfig);
  const y = useSpring(yPoint, springConfig);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      if (element) {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2 + 15);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2 - 5);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, xPoint, yPoint]);

  return { x, y };
}
