import {
  useInView,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
} from "framer-motion";

import { lazy, useCallback, useEffect, useRef, useState } from "react";

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
}

const Home = ({
  handleNavColor,
  navColor,
  onHoverChange,
  scrollToContact,
  scrollToHome,
  scrollToWork,
}: HomeProps) => {
  const controls = useAnimation();

  const [deviceSize, setDeviceSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const totalWidth = deviceSize.width * 0.8 * 2 + 12;
  const totalWidthMd = deviceSize.width * 0.7 * 2 - 48;
  const section2ScrollWidth =
    deviceSize.width > 768 ? totalWidthMd : totalWidth;

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
  const { scrollYProgress: scrollSection2Progres } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  const section3Ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: scrollSection3Progress } = useScroll({
    target: section3Ref,
    offset: ["start end", "end start"],
  });

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
      val > 0.7 || val <= 0.2 ? "text-slate-700" : "text-slate-100",
  );

  const projectTranslateX = useSpring(
    useTransform(scrollSection3Progress, [0.3, 0.4], [0, -section2ScrollWidth]),
    { stiffness: 300, damping: 50 },
  );

  const section4TranslateY = useTransform(
    scrollSection3Progress,
    [0.5, 0.7],
    [0, -100],
  );

  const section4Ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(section4Ref, { margin: "-100px" });

  const scrollToEndSection = useCallback(async () => {
    await controls.start({ y: ["0vh", "-100vh"] });
    section4Ref.current?.scrollIntoView({ behavior: "smooth" });
    // console.log("Scrolling to end section...");
  }, [controls]);

  useEffect(() => {
    scrollToContact(scrollToEndSection);
  }, [scrollToContact, scrollToEndSection]);

  useEffect(() => {
    const unsubscribe = transformedValue.on("change", (color) => {
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

  // console.log("hai hai");

  return (
    <div className={`relative flex flex-col`}>
      <section
        className="justify-end] relative z-40 flex min-h-[100vh] w-full flex-col overflow-hidden md:px-4"
        ref={section1Ref}
      >
        <HeroImgSection
          deviceSize={deviceSize}
          heroTextSectionScroll={scrollSection2Progres}
          navColor={navColor}
          scrollToEndSection={scrollToEndSection}
        />
      </section>

      <section ref={section2Ref} className="z-50 min-h-[100vh]">
        <HeroTextSection />
      </section>

      <section
        ref={section3Ref}
        className="relative z-20 min-h-[300vh] bg-slate-700"
      >
        <ProjectsSection
          deviceSize={deviceSize}
          projectTranslateX={projectTranslateX}
        />
      </section>

      {/* section4 */}
      <motion.section
        ref={section4Ref}
        className="absolute bottom-0 z-30 flex min-h-[100vh] w-full flex-col overflow-hidden bg-slate-100 px-4 pt-28 md:px-24 md:pt-36"
        style={{
          y: section4TranslateY + "vh",
        }}
      >
        <ContactSection
          scrollToStartSection={scrollToStartSection}
          isInView={isInView}
        />
      </motion.section>
    </div>
  );
};

export default Home;
