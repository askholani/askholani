import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const imgURLs = [
  "./images/collaborating.png",
  "./images/creating.png",
  "./images/maintaining.png",
];
const screenHeight = "-" + (window.innerHeight / 2 - 100).toFixed(0) + "px";

const LoadingScreen = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setIsHidden(true));
    const timeout = setTimeout(() => cancelAnimationFrame(handle), 4800);

    return () => clearTimeout(timeout);
  }, []);

  const parentVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      },
    },
  };

  const childVariants: Variants = {
    initial: { y: "300px", rotate: 0 },
    animate: (i: number) => ({
      y: screenHeight,
      opacity: 1,
      rotate: i === 1 ? -12 : i === 2 ? 12 : 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: i * 1,
      },
    }),
  };

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-secondary transition-all duration-500 ${
        isHidden ? "hidden opacity-0" : "opacity-100"
      }`}
      variants={parentVariants}
      initial="initial"
      animate="animate"
    >
      {imgURLs.map((url: string, index: number) => {
        const name = url
          ? url
              .split("/")
              .pop()
              ?.split(".")[0]
              ?.replace(/[-_]/g, " ")
              .toUpperCase()
          : "Unknown";

        return (
          <motion.div
            key={index}
            className="absolute bottom-0 flex flex-col items-center justify-center bg-white"
            variants={childVariants}
            custom={index}
          >
            <div className="h-40 w-40 md:h-56 md:w-56">
              <img
                className="brightness-90"
                src={url}
                alt={`Image of ${name}`}
                loading="eager"
                srcSet={`${url} 1x, ${url.replace(".png", "@2x.png")} 2x`}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <span className="my-2 capitalize tracking-wider">{name}</span>
          </motion.div>
        );
      })}

      <motion.div
        className="absolute bottom-0 flex flex-col items-center justify-center bg-white"
        initial={{ y: "300px", rotate: 0 }}
        animate={{
          y: screenHeight,
          opacity: 1,
          rotate: 0,
          transition: {
            duration: 1,
            ease: "easeOut",
            delay: imgURLs.length * 1,
          },
        }}
      >
        <motion.div
          className="h-40 w-40 bg-slate-100 md:h-56 md:w-56"
          initial={{ scale: 0.9 }}
          animate={{
            scaleX: 10,
            scaleY: 5,
            transition: {
              duration: 0.5,
              ease: "easeOut",
              delay: (imgURLs.length + 1) * 1,
            },
          }}
        ></motion.div>

        <span className="my-2 capitalize tracking-wider">welcome</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
