import { motion } from "framer-motion";
import { useRef } from "react";
import { useScrollOpacity } from "../../../hooks";

const HeroTextSection = () => {
  const ref1 = useRef<HTMLParagraphElement | null>(null);
  const ref2 = useRef<HTMLParagraphElement | null>(null);
  const ref3 = useRef<HTMLParagraphElement | null>(null);

  const opacityP1 = useScrollOpacity(ref1);
  const opacityP2 = useScrollOpacity(ref2);
  const opacityP3 = useScrollOpacity(ref3);

  return (
    // <section ref={refSection} className="z-20 min-h-[100vh]">
    <div className="mx-8 my-4 flex w-[75%] flex-col gap-y-24 text-3xl font-extrabold md:mx-16 md:text-5xl">
      <motion.p ref={ref1} style={{ opacity: opacityP1 }}>
        I partner with businesses, brands, and entrepreneurs to develop digital
        products that help achieve their objectives.
      </motion.p>
      <motion.p ref={ref2} style={{ opacity: opacityP2 }}>
        I design exceptional experiences that reshape how users engage with the
        digital space, combining creativity with practicality to deliver
        impactful solutions.
      </motion.p>
      <motion.p ref={ref3} style={{ opacity: opacityP3 }}>
        My dedication lies in exceeding expectations, crafting unforgettable and
        meaningful experiences where every detail and interaction makes a
        difference.
      </motion.p>
    </div>
    // </section>
  );
};

export default HeroTextSection;
