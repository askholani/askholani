import { motion, useMotionValue, useSpring } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  // console.log("ref", ref);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "fixed",
        width: "25px",
        height: "25px",
        backgroundColor: "#374151",
        borderRadius: "50%",
        x,
        y,
      }}
    />
  );
}

// const springConfig = { damping: 1, stiffness: 50, restDelta: 0.001 };
// const springConfig = { stiffness: 200, mass: 1, restDelta: 1000 };
const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, springConfig);
  const y = useSpring(yPoint, springConfig);
  // const x = useSpring(xPoint);
  // const y = useSpring(yPoint);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current;

      // console.log("element", element);

      console.log("clientX", clientX);
      console.log("clientY", clientY);

      if (element) {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, xPoint, yPoint]);

  return { x, y };
}

// import { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function Cursor() {
//   const cursorRef = useRef<HTMLDivElement | null>(null);
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const [isOverSection, setIsOverSection] = useState(false);

//   useEffect(() => {
//     const handlePointerMove = (event: MouseEvent) => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();

//         console.log("rect", rect);
//         console.log("event", event);

//         const isInside =
//           event.clientX >= rect.left &&
//           event.clientX <= rect.right &&
//           event.clientY >= rect.top &&
//           event.clientY <= rect.bottom;

//         setIsOverSection(isInside);
//       }

//       if (cursorRef.current) {
//         cursorRef.current.style.left = `${event.clientX}px`;
//         cursorRef.current.style.top = `${event.clientY}px`;
//       }
//     };

//     window.addEventListener("pointermove", handlePointerMove);

//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//     };
//   }, []);

//   return (
//     <>
//       <motion.div
//         ref={cursorRef}
//         style={{
//           position: "fixed",
//           width: "25px",
//           height: "25px",
//           backgroundColor: isOverSection ? "red" : "#374151",
//           borderRadius: "50%",
//           pointerEvents: "none",
//           transform: "translate(-50%, -50%)",
//         }}
//       />
//       {/* <section
//         ref={sectionRef}
//         style={{
//           minHeight: "100vh",
//           background: "lightgrey",
//           marginTop: "50px",
//         }}
//       >
//         <h1>Hover over this section to detect cursor presence</h1>
//       </section>
//       <section className="min-h-[100vh]"></section> */}
//     </>
//   );
// }
