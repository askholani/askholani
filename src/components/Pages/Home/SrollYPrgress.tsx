import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { useRef } from "react";

const ScrollYProgressComponent = () => {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: scrollRef1 } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
    // offset: ["start start", "end end"],
  });

  const { scrollYProgress: scrollRef2 } = useScroll({
    target: ref2,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: scrollRef3 } = useScroll({
    target: ref3,
    offset: ["start end", "end start"],
  });

  // useTransform(scrollRef1, (val) => {
  //   console.log("section 1 val", val);
  // });

  // useTransform(scrollRef2, (val) => {
  //   console.log("section 2 val", val);
  // });

  // const scoroll = useScroll();
  // useMotionValueEvent(scoroll.scrollY, "change", (latest) => {
  //   console.log("scrollY", latest);
  // });

  // useMotionValueEvent(scoroll.scrollX, "change", (latest) => {
  //   console.log("scrollX", latest);
  // });

  const y = useTransform(scrollRef2, [50, 100], [0, -100]);
  // console.log("y", y);
  // useTransform(scrollRef2, (val) => {
  //   // console.log("section 2 val", val);
  //   console.log("scrollRef2", val);
  // });

  // useTransform(scrollRef1, (val) => {
  //   // console.log("section 1 val", val);
  //   console.log("scrollRef1", val);
  // });

  useTransform(scrollRef3, (val) => {
    // console.log("section 1 val", val);
    console.log("scrollRef3", val);
  });

  return (
    <div className="relative">
      <div className="h-[100vh] bg-slate-100" ref={ref1}></div>
      <div className="h-[300vh] bg-slate-500" ref={ref2}></div>
      {/* <div className="h-[100vh] bg-slate-800" ref={ref3}></div>
      <div className="h-[100vh] bg-slate-50"></div> */}
      {/* <div className="h-[1000vh] bg-slate-500" ref={ref2}></div> */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[100vh] bg-slate-800"
        style={{ y }}
      ></motion.div>
    </div>
  );
};

export default ScrollYProgressComponent;
