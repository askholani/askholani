import { useCallback, useMemo, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";
import Cursor from "./components/Cursor/Cursor";
import ScrollYProgressComponent from "./components/Pages/Home/SrollYPrgress";

export default function App() {
  const [isOverSection, setIsOverSection] = useState(false);
  const [navColor, setNavColor] = useState("text-slate-700");
  const [navHeight, setNavHeight] = useState(0);

  console.log("navHeight", navHeight);

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

  // console.log("isOverSection", isOverSection);

  return (
    <main className="text-slate-700">
      {/* <LoadingScreen /> */}
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
      {/* <ScrollYProgressComponent /> */}
      <Cursor isOverSection={isOverSection} />
    </main>
  );
}
