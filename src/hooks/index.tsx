import { useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function useScrollOpacity(
  targetRef: React.RefObject<HTMLElement | null>,
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 0.6, 1], [0.01, 1, 0.01]);
}

export const useAnimationOnce = (ref: React.RefObject<HTMLElement>) => {
  const hasAnimated = useRef(false);
  const isInView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
    }
  }, [isInView]);

  return hasAnimated.current;
};
