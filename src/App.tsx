import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";
import Cursor from "./components/Cursor/Cursor";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [isOverSection, setIsOverSection] = useState(false);
  const [navColor, setNavColor] = useState("text-slate-700");
  const [navHeight, setNavHeight] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHidden(true);
    }, 4800);

    return () => clearTimeout(timeout);
  }, []);

  const handleNavColor = useCallback((color: string) => {
    setNavColor(color);
  }, []);

  const scrollToContactRef = useRef<(() => void) | null>(null);
  const scrollToWorkRef = useRef<(() => void) | null>(null);
  const scrollToHomeRef = useRef<(() => void) | null>(null);

  const handleScrollToHome = useCallback(() => {
    scrollToHomeRef.current?.();
  }, []);

  const handleScrollToContact = useCallback(() => {
    scrollToContactRef.current?.();
  }, []);

  const handleScrollToWork = useCallback(() => {
    scrollToWorkRef.current?.();
  }, []);

  const handleNavHeight = useCallback((height: number) => {
    setNavHeight(height);
  }, []);

  const scrollHandlers = useMemo(
    () => ({
      scrollToHome: handleScrollToHome,
      scrollToContact: handleScrollToContact,
      scrollToWork: handleScrollToWork,
    }),
    [handleScrollToHome, handleScrollToContact, handleScrollToWork],
  );

  // console.log("isHidden", isHidden);

  return (
    <>
      {!isHidden && <LoadingScreen isHidden={isHidden} />}
      {isHidden && (
        <main className="text-slate-700">
          <Navbar
            {...scrollHandlers}
            navColor={navColor}
            handleNavHeight={handleNavHeight}
          />
          <Home
            scrollToContact={(ref) => (scrollToContactRef.current = ref)}
            scrollToWork={(ref) => (scrollToWorkRef.current = ref)}
            scrollToHome={(ref) => (scrollToHomeRef.current = ref)}
            handleNavColor={handleNavColor}
            navColor={navColor}
            onHoverChange={setIsOverSection}
            navHeight={navHeight}
          />
          <Cursor isOverSection={isOverSection} />
          <Footer />
        </main>
      )}
    </>
  );
}
