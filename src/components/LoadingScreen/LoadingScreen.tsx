import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const imgURLs = [
  "./images/collaborating.png",
  "./images/creating.png",
  "./images/maintaining.png",
];

const LoadingScreen = () => {
  const [isHidden, setIsHidden] = useState(false); // State untuk mengontrol visibility
  const screenHeight = "-" + (window.innerHeight / 2 - 100).toFixed(0) + "px";

  // Menghilangkan elemen setelah 4.8 detik
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHidden(true);
    }, 4800); // 4.8 detik dalam milidetik

    return () => clearTimeout(timeout); // Bersihkan timeout saat komponen di-unmount
  }, []);

  const parentVariants: Variants = {
    animate: {
      transition: {
        // staggerChildren: 0.3, // Delay between children animations
        staggerChildren: 0.2, // Delay between children animations
        delayChildren: 1, // Delay before starting the animation
      },
    },
  };

  const childVariants: Variants = {
    initial: { y: "300px", rotate: 0 }, // Initial rotate to 0 degree
    animate: (i: number) => ({
      y: screenHeight,
      opacity: 1,
      rotate: i === 1 ? -12 : i === 2 ? 12 : 0, // Apply different rotations based on index
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: i * 1, // Dynamically delay each child based on its index
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
            key={index} // Tambahkan key unik
            className="absolute bottom-0 flex flex-col items-center justify-center bg-white"
            variants={childVariants}
            custom={index} // Passing custom index value for delay
          >
            <div className="h-56 w-56">
              <img
                className="brightness-90"
                src={url}
                alt={`Image of ${name}`} // alt deskriptif
                loading="lazy"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                  transform: "scale(.9)",
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
          className="h-56 w-56 bg-slate-100"
          initial={{ scale: 0.9 }} // Gunakan 'scale' untuk awal
          animate={{
            scaleX: 10, // Skalakan sumbu X
            scaleY: 5, // Skalakan sumbu Y
            transition: {
              duration: 0.5, // Durasi animasi
              ease: "easeOut", // Kurva animasi
              delay: (imgURLs.length + 1) * 1, // Hitung delay berdasarkan panjang array
            },
          }}
        ></motion.div>

        <span className="my-2 capitalize tracking-wider">welcome</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
