import {
  useInView,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
  useMotionValueEvent,
} from "framer-motion";
import { use } from "motion/react-client";

import { lazy, useCallback, useEffect, useMemo, useRef } from "react";

const HeroImgSection = lazy(() => import("./HeroImgSection"));
const HeroTextSection = lazy(() => import("./HeroTextSection"));
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const ContactSection = lazy(() => import("./ContactSection"));

interface HomeProps {
  handleNavColor: (color: string) => void;
  navColor: string;
  onHoverChange: (isHovering: boolean) => void;
  scrollToContact: (ref: () => void) => void;
  scrollToWork: (ref: () => void) => void;
  scrollToHome: (ref: () => void) => void;
  navHeight: number;
}

const Home = ({
  handleNavColor,
  navColor,
  onHoverChange,
  scrollToContact,
  scrollToHome,
  scrollToWork,
  navHeight,
}: HomeProps) => {
  const controls = useAnimation();

  const deviceSize = useMemo(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    [],
  );

  // const totalWidth = deviceSize.width * 0.8 * 2 + 12;
  // const totalWidthMd = deviceSize.width * 0.7 * 2 - 48;

  // const section2ScrollWidth =
  //   deviceSize.width > 768 ? totalWidthMd : totalWidth;

  const section1Ref = useRef<HTMLDivElement | null>(null);

  const scrollToStartSection = useCallback(async () => {
    controls.start({
      y: ["0vh", "-100vh"],
    });
    section1Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [controls]);

  useEffect(() => {
    scrollToHome(scrollToStartSection);
  }, [scrollToHome, scrollToStartSection]);

  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section2InView = useInView(section2Ref, { amount: 0.2 });

  const { scrollYProgress: scrollSection2Progres } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  // useTransform(scrollSection2Progres, (val) => {
  //   console.log("section 2 val", val);
  // });

  const section3Ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: scrollSection3Progress } = useScroll({
    target: section3Ref,
    offset: ["start end", "end start"],
  });

  // const x = useTransform(scrollSection3Progress, [0, 1], ["0%", "-100%"]);

  // console.log("x", x);
  // console.log("scrollSection3Progress", scrollSection3Progress);

  // ------------------------------
  // const coba = useRef<HTMLDivElement | null>(null);

  // const { scrollYProgress: scrollCoba } = useScroll({
  //   target: coba,
  //   offset: ["start end", "end start"],
  // });

  // useTransform(scrollCoba, (val) => {
  //   console.log("val", val);
  // });

  // -------------------------------

  useTransform(scrollSection3Progress, (val) => {
    console.log("section 3 val", val);
  });

  // useTransform(scrollSection2Progres, (val) => {
  //   console.log("section 2 val", val);
  // });

  const scrollToWorkSection = useCallback(() => {
    controls.start({
      y: ["0vh", "-100vh"],
    });
    section3Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [controls]);

  useEffect(() => {
    scrollToWork(scrollToWorkSection);
  }, [scrollToWork, scrollToWorkSection]);

  const transformedValue = useTransform(
    scrollSection3Progress,
    (val: number) =>
      val > 0.9 || val <= 0.09 ? "text-slate-700" : "text-slate-100",
  );
  const section2ScrollWidth = Math.floor(
    deviceSize.width * 2 * (deviceSize.width > 768 ? 0.7 : 0.8),
  );

  // const projectTranslateX = useSpring(
  //   useTransform(
  //     scrollSection3Progress,
  //     // [0.3, 0.55],
  //     [0.15, 0.7],
  //     [0, -section2ScrollWidth],
  //   ),
  //   { stiffness: 200, damping: 50, mass: 1 },
  // );

  const projectTranslateX = useSpring(
    useTransform(
      scrollSection3Progress,
      [0.25, 0.7],
      [0, -section2ScrollWidth],
    ),
    { stiffness: 120, damping: 30, mass: 0.8 },
  );

  const section4TranslateY = useTransform(
    scrollSection3Progress,
    [0.7, 0.8], // Use a different range for vertical movement
    [0, deviceSize.height],
  );

  useTransform(section4TranslateY, (val) => {
    console.log("section4TranslateY", val);
  });

  // useMotionValueEvent(section4TranslateY, "change", (latest) => {
  //   console.log("section4TranslateY", latest);
  // });

  // useMotionValueEvent(scrollSection3Progress, "change", (latest) => {
  //   console.log("scrollSection3Progress", latest);
  // });

  const section4Ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(section4Ref, { margin: "-100px" });

  const scrollToEndSection = useCallback(async () => {
    await controls.start({ y: ["0vh", "-100vh"] });
    section4Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [controls]);

  useEffect(() => {
    scrollToContact(scrollToEndSection);
  }, [scrollToContact, scrollToEndSection]);

  useEffect(() => {
    const unsubscribe = transformedValue.on("change", (color) => {
      console.log("color", color);
      handleNavColor(color);
    });
    return () => unsubscribe();
  }, [transformedValue, handleNavColor]);

  useEffect(() => {
    const sections = [
      section2Ref.current,
      section3Ref.current,
      section4Ref.current,
    ];
    if (sections.some((section) => !section)) return;

    const handlePointerEnter = (isHover: boolean) => () => {
      onHoverChange(isHover);
    };

    sections.forEach((section, index) => {
      if (!section) return;
      section.addEventListener("pointerenter", handlePointerEnter(index === 1));
    });

    return () => {
      sections.forEach((section, index) => {
        if (!section) return;
        section.removeEventListener(
          "pointerenter",
          handlePointerEnter(index === 1),
        );
      });
    };
  }, [onHoverChange]);

  return (
    <>
      {/* <div className="h-[100vh]" ref={coba}></div> */}
      <div className={`relative flex flex-col`}>
        <section
          className="justify-end] relative z-40 flex min-h-[100vh] w-full flex-col overflow-hidden md:px-4"
          ref={section1Ref}
        >
          <HeroImgSection
            navHeight={navHeight}
            section2InView={section2InView}
            deviceSize={deviceSize}
            heroTextSectionScroll={scrollSection2Progres}
            navColor={navColor}
            scrollToEndSection={scrollToEndSection}
          />
        </section>

        <section ref={section2Ref} className="z-50 h-[100vh]">
          <HeroTextSection />
        </section>

        <section
          ref={section3Ref}
          className="relative z-20 h-[500vh] bg-slate-700"
          // className="relative z-20 h-[300vh] bg-slate-700"
        >
          <ProjectsSection
            deviceSize={deviceSize}
            projectTranslateX={projectTranslateX}
          />
        </section>

        <motion.section
          ref={section4Ref}
          className="absolute bottom-0 z-30 flex h-[100vh] w-full flex-col overflow-hidden bg-slate-100 px-4 pt-28 md:px-24 md:pt-36"
          // className="bottom-0 z-30 flex h-[100vh] w-full flex-col overflow-hidden bg-slate-100 px-4 pt-28 md:px-24 md:pt-36"
          style={
            {
              // y: section4TranslateY,
            }
          }
        >
          <ContactSection
            scrollToStartSection={scrollToStartSection}
            isInView={isInView}
          />
        </motion.section>
      </div>
    </>
  );
};

export default Home;
