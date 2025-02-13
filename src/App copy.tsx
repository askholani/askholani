import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";
import HomeExp from "./components/Pages/Home/Home copy 2";
import HomeExp3 from "./components/Pages/Home/Home copy 3";
import Cursor from "./components/Cursor/Cursor";

export default function App() {
  const [isOverSection, setIsOverSection] = useState(false);
  console.log("isOverSection", isOverSection);
  const [navColor, setNavColor] = useState("text-slate-700");

  const handleNavColor = (color: string) => setNavColor(color);
  return (
    <main className="text-slate-700">
      {/* <LoadingScreen /> */}
      <Navbar navColor={navColor} />
      <Home
        handleNavColor={handleNavColor}
        navColor={navColor}
        onHoverChange={setIsOverSection}
      />
      <Cursor isOverSection={isOverSection} />
    </main>
  );
}
