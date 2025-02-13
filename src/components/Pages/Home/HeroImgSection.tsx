import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  motion,
  MotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useEffect, useState } from "react";

interface HeroImgSectionProps {
  deviceSize: { width: number; height: number };
  heroTextSectionScroll: MotionValue<number>;
  scrollToEndSection: () => void;
  navColor: string;
}

const HeroImgSection = ({
  deviceSize,
  heroTextSectionScroll,
  scrollToEndSection,
  navColor,
}: HeroImgSectionProps) => {
  const [displayText, setDisplayText] = useState<string[]>(
    getRandomArrays(selamatDatang, 6),
  );
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const greetings = getRandomArrays(selamatDatang, 7);

    if (hovering) {
      interval = setInterval(() => {
        setDisplayText(getRandomArraysLetter(greetings));
      }, 50);
    } else {
      setDisplayText((prev) => {
        return greetings || prev;
      });
    }

    return () => clearInterval(interval);
  }, [hovering]);

  const translateY = useTransform(
    heroTextSectionScroll,
    [0, 0.1],
    ["0vh", `${deviceSize.width > 768 ? "-71vh" : "-85vh"}`],
  );

  const scale = useTransform(
    heroTextSectionScroll,
    [0, 0.1],
    [1, `${deviceSize.width > 768 ? "0.25" : "0.5"}`],
  );

  const translateX = useTransform(
    heroTextSectionScroll,
    [0, 0.1],

    ["0%", `${deviceSize.width > 768 ? "-45%" : "-35%"}`],
  );

  const opacity = useTransform(heroTextSectionScroll, [0, 0.1], [1, 0]);

  const skewXImg = useSpring(
    useTransform(
      heroTextSectionScroll,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      ["0deg", "7deg", "-7deg", "7deg", "-7deg", "7deg"],
    ),
    { stiffness: 150, damping: 25 },
  );

  const translateYValues = {
    md: ["0px", "-300px", "-800px"],
    default: ["0px", "-400px", "-1000px"],
  };

  const translateYHeroImg =
    deviceSize.width > 768 ? translateYValues.md : translateYValues.default;

  const translateYImgSection1 = useSpring(
    useTransform(heroTextSectionScroll, [0.25, 0.85, 0.9], translateYHeroImg),
    { stiffness: 100, damping: 25 },
  );

  const blurImg = useTransform(heroTextSectionScroll, [0.1, 0.5], [0, 5]);

  const blurImgConv = useTransform(blurImg, (value) => {
    if (value > 0.2) {
      return Math.floor(value);
    }
    return 0;
  });

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-[5%] z-50 flex"
        style={{
          y: translateY,
          scale,
          x: translateX,
        }}
      >
        <motion.div
          style={{ opacity }}
          className="relative flex flex-col justify-end py-6"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 7.5,
            },
          }}
        >
          <ArrowDownIcon
            onClick={() => {
              console.log("hai");
              return scrollToEndSection();
            }}
            className="h-12 w-12 font-extrabold md:h-20 md:w-20"
          />
        </motion.div>
        <motion.div className="flex flex-col text-5xl md:text-9xl">
          <motion.div
            className={`flex flex-col font-extrabold ${navColor}`}
            initial="initial"
            animate="animate"
          >
            <motion.div className="relative flex md:top-3">
              {stringFirst.split("").map((str: string, i: number) => (
                <motion.span
                  key={i + str}
                  style={{ display: "inline-block" }}
                  className="overflow-hidden whitespace-nowrap"
                  variants={stringFirstChildVariants}
                  custom={i}
                >
                  {str}
                </motion.span>
              ))}
            </motion.div>
            <motion.div className="-md:top-3 relative flex">
              {stringSecond.split("").map((str: string, i: number) => (
                <motion.span
                  key={i + str}
                  style={{ display: "inline-block" }}
                  className="overflow-hidden whitespace-nowrap"
                  variants={stringSecondChildVariants}
                  custom={i}
                >
                  {str}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className={`fixed my-2 flex flex-col items-center justify-center bg-white p-8 ${
          deviceSize.width > 768
            ? "bottom-[25%] right-[10%]"
            : "bottom-[15%] right-[-10%]"
        } z-10 scale-75 shadow-md md:scale-100`}
        variants={imgVariants}
        initial="initial"
        animate="animate"
        style={{
          skewX: skewXImg,
          scale: deviceSize.width > 768 ? 1 : 0.7,
          y: translateYImgSection1,
          filter: `blur(${blurImgConv.get()}px)`,
        }}
      >
        <div
          className={`flex h-[25rem] w-[20rem] flex-col items-center justify-center gap-y-2 border-4 border-slate-700 px-1`}
          onPointerEnter={() => {
            console.log("pointer enter");
            setHovering(true);
          }}
          onPointerLeave={() => {
            console.log("pointer leave");
            setHovering(false);
          }}
        >
          <span className="font-semibold opacity-20">HOVER ME</span>
          {displayText.map((text, i) => (
            <motion.span key={i} className="text-3xl font-bold uppercase">
              {text}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HeroImgSection;

const stringFirst = "FULLSTACK";
const stringSecond = "DEVELOPER";

const stringFirstChildVariants: Variants = {
  initial: {
    height: 0,
    transform: "translateY(100px)",
  },
  animate: (i: number) => {
    const middleIndex = Math.floor(stringFirst.length / 2);
    const distanceFromMiddle = Math.abs(i - middleIndex);
    const delay = distanceFromMiddle * 0.05;
    return {
      height: "100%",
      transform: "translateY(0)",
      transition: {
        duration: 0.8,
        ease: "backIn",
        delay: delay + 6,

        damping: 10,
        mass: 1,
      },
    };
  },
};

const stringSecondChildVariants: Variants = {
  initial: {
    height: 0,
  },
  animate: (i: number) => {
    const middleIndex = Math.floor(stringSecond.length / 2);
    const distanceFromMiddle = Math.abs(i - middleIndex);
    const delay = distanceFromMiddle * 0.1;
    return {
      height: "100%",
      transition: {
        duration: 1,
        ease: "backIn",
        delay: delay + 6,
      },
    };
  },
};

const imgVariants: Variants = {
  initial: {
    opacity: 0,
    x: "50%",
    rotate: -30,
  },
  animate: {
    opacity: 1,
    rotate: 2,
    x: "-10%",
    transition: { duration: 1, delay: 7 },
  },
};

const selamatDatang = [
  "Selamat Datang",
  "Selamat Datang",
  "ようこそ",
  "환영합니다",
  "欢迎",
  "स्वागत है",
  "ยินดีต้อนรับ",
  "Chào mừng",
  "مرحباً ",

  "Welcome",
  "Willkommen",
  "Bienvenue",
  "Bienvenido/a",
  "Benvenuto/a",
  "Welkom",
  "Bem-vindo/a",
  "Välkommen",
  "Καλώς ήρθατε",

  "Welkom",
  "Siyakwamukela",
  "Barka da zuwa",
  "Karibu",
  "Azul",
  "Boyei malamu",
  "Soo dhowow",
  "Nnọọ",
  "Tonga soa",

  "Bienvenido/a",
  "Welcome",
  "Bem-vindo/a",
  "Rimaykullayki",
  "Eguahẽ porã",
  "Bix a beel",
  "Jilallinaka",
  "Byenveni",
  "Mari mari",
  "Amõ nhe’eng",

  "Aloha",
  "Afio mai",
  "Bula",
  "Malo e lelei",
  "Håfa adai",
  "Alii",
  "Nhamirra",
  "Welkam",
  "Welkam",
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomArrays = (arr: string[], count: number): string[] => {
  const selected = new Set<string>();
  while (selected.size < count) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    selected.add(arr[randomIndex]);
  }
  return Array.from(selected);
};

const getRandomArraysLetter = (arr: string[]): string[] => {
  const selected = new Set<string>();
  arr.forEach((text) => {
    selected.add(
      Array.from(
        { length: text.length },
        () => alphabet[Math.floor(Math.random() * alphabet.length)],
      ).join(""),
    );
  });
  return Array.from(selected);
};
