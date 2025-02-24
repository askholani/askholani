import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  motion,
  MotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getResponsiveValue } from "../../../utils";

interface HeroImgSectionProps {
  deviceSize: { width: number; height: number };
  heroTextSectionScroll: MotionValue<number>;
  scrollToEndSection: () => void;
  navColor: string;
  section2InView: boolean;
  navHeight: number;
}

const breakpoints = [1280, 768];
const vh = window.innerHeight;

const HeroImgSection = ({
  deviceSize,
  heroTextSectionScroll,
  scrollToEndSection,
  navColor,
  section2InView,
  navHeight,
}: HeroImgSectionProps) => {
  const [displayText, setDisplayText] = useState<string[]>(
    getRandomArrays(selamatDatang, 6),
  );
  const [hovering, setHovering] = useState(false);

  const memoizedFirstString = useMemo(() => stringFirst.split(""), []);
  const memoizedSecondString = useMemo(() => stringSecond.split(""), []);

  useEffect(() => {
    let animationFrameId: number;

    const updateDisplayText = () => {
      setDisplayText((prev) => getRandomArraysLetter(prev));
      animationFrameId = requestAnimationFrame(updateDisplayText);
    };

    if (hovering) {
      animationFrameId = requestAnimationFrame(updateDisplayText);
    } else {
      setDisplayText(getRandomArrays(selamatDatang, 6));
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [hovering]);

  const translateYTarget = useMemo(() => {
    const value = getResponsiveValue({
      values: [1.3, 1.1, 1],
      width: deviceSize.width,
      breakpoints,
    });

    return typeof value === "number" && value !== 1
      ? `${vh * -1 + navHeight * value}px`
      : `${vh * -1 + navHeight * 0.25}px`;
  }, [deviceSize, navHeight]);

  const scaleText = useMemo(
    () =>
      getResponsiveValue({
        values: [0.25, 0.3, 0.5],
        width: deviceSize.width,
        breakpoints,
      }),
    [deviceSize],
  );

  const translateXText = useMemo(
    () =>
      getResponsiveValue({
        values: ["-45%", "-40%", "-35%"],
        width: deviceSize.width,
        breakpoints,
      }),
    [deviceSize],
  );

  const scaleImg = useMemo(
    () =>
      getResponsiveValue({
        values: [1, 0.85, 0.65],
        width: deviceSize.width,
        breakpoints,
      }),
    [deviceSize],
  );

  const translateY = useTransform(
    heroTextSectionScroll,
    [0, 0.1],
    ["0vh", translateYTarget],
  );

  const scale = useTransform(heroTextSectionScroll, [0, 0.1], [1, scaleText]);

  const translateX = useTransform(
    heroTextSectionScroll,
    [0, 0.1],
    ["0%", translateXText],
  );

  const opacity = useTransform(heroTextSectionScroll, [0, 0.1], [1, 0]);

  const translateYHeroImg =
    deviceSize.width > 768 ? [-0, -200, -800] : [0, -300, -1000];

  const translateYImgSection1 = useSpring(
    useTransform(heroTextSectionScroll, [0.25, 0.75, 0.8], translateYHeroImg),
    { stiffness: 120, damping: 20, mass: 0.8 },
  );

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
              return scrollToEndSection();
            }}
            className="h-12 w-12 font-extrabold md:h-20 md:w-20"
          />
        </motion.div>
        <motion.div className="flex flex-col text-5xl md:text-8xl xl:text-9xl">
          <motion.div
            className={`flex flex-col font-extrabold ${navColor}`}
            initial="initial"
            animate="animate"
          >
            <motion.div className="relative flex md:top-3">
              {memoizedFirstString.map((str, i) => (
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
              {memoizedSecondString.map((str, i) => (
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
          scale: scaleImg,
          y: translateYImgSection1,
          filter: section2InView ? "blur(5px)" : "blur(0px)",
        }}
      >
        <div
          className={`flex h-[25rem] w-[20rem] flex-col items-center justify-center gap-y-2 border-4 border-slate-700 px-1`}
          onPointerEnter={() => {
            setHovering(true);
          }}
          onPointerLeave={() => {
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
