import { useCallback, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";
import Cursor from "./components/Cursor/Cursor";

export default function App() {
  const [isOverSection, setIsOverSection] = useState(false);
  const [navColor, setNavColor] = useState("text-slate-700");

  const handleNavColor = useCallback((color: string) => {
    setNavColor(color);
  }, []);

  const scrollToContactRef = useRef<(() => void) | null>(null);
  const scrollToWorkRef = useRef<(() => void) | null>(null);
  const scrollToHomeRef = useRef<(() => void) | null>(null);

  const handleScrollToHome = () => {
    if (scrollToHomeRef.current) {
      scrollToHomeRef.current();
    }
  };

  const handleScrollToContact = () => {
    if (scrollToContactRef.current) {
      scrollToContactRef.current();
    }
  };

  const handleScrollToWork = () => {
    if (scrollToWorkRef.current) {
      scrollToWorkRef.current();
    }
  };

  return (
    <main className="text-slate-700">
      <LoadingScreen />
      <Navbar
        navColor={navColor}
        scrollToHome={handleScrollToHome}
        scrollToContact={handleScrollToContact}
        scrollToWork={handleScrollToWork}
      />
      <Home
        scrollToContact={(ref) => (scrollToContactRef.current = ref)}
        scrollToWork={(ref) => (scrollToWorkRef.current = ref)}
        scrollToHome={(ref) => (scrollToHomeRef.current = ref)}
        handleNavColor={handleNavColor}
        navColor={navColor}
        onHoverChange={setIsOverSection}
      />
      <Cursor isOverSection={isOverSection} />
    </main>
  );
}
