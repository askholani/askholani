import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = ({
  navColor,
  scrollToHome,
  scrollToContact,
  scrollToWork,
}: NavbarProps) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHidden(true);
    }, 4800);

    return () => clearTimeout(timeout);
  }, []);

  const newLink = navLinks.map((link) => ({
    ...link,
    method:
      link.label === "Home"
        ? scrollToHome
        : link.label === "Work"
          ? scrollToWork
          : link.label === "Contact"
            ? scrollToContact
            : () => {},
  }));

  // console.log(newLink);

  return (
    <nav
      className={`p3b-4 fixed left-0 right-0 top-0 z-50 flex items-start justify-between pt-2 md:px-12 md:pt-8 ${
        isHidden ? "opacity-100" : "hidden opacity-0"
      } text-md font-semibold md:text-2xl ${navColor} px-4`}
    >
      <motion.h1
        style={{ transform: "translateY(-10px)" }}
        variants={gmailParentVariants}
        animate="animate"
        initial="intial"
        className="flex -tracking-wide"
      >
        {gmail.split("").map((str: string, index: number) => (
          <motion.div
            key={index + str}
            className="font-semibold opacity-0"
            variants={gmailChildVariants}
          >
            {str}
          </motion.div>
        ))}
      </motion.h1>
      <ul className="flex flex-col md:gap-y-2">
        {newLink.map((link, index) => (
          <li key={index + link.path} className="group">
            <motion.div
              onClick={link.method}
              style={{ transform: "translateY(-10px)" }}
              className="flex justify-end font-semibold tracking-wide"
              variants={navParentVariants}
              animate="animate"
            >
              {link.label.split("").map((str: string, idx: number) => (
                <motion.span
                  key={idx + str}
                  variants={navChildVariants}
                  className="opacity-0"
                >
                  {str}
                </motion.span>
              ))}
            </motion.div>
            <div
              className={`h-1 max-w-0 transition-all duration-300 group-hover:max-w-full bg${navColor.split("text")[1]}`}
            ></div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

const gmail = "askholani.ibnuhajar@gmail.com";
interface NavbarProps {
  navColor: string;
  scrollToContact: () => void;
  scrollToWork: () => void;
  scrollToHome: () => void;
}

const gmailParentVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 4.8,
    },
  },
};

const gmailChildVariants: Variants = {
  animate: {
    y: "10px",
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

const navParentVariants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 4.8,
    },
  },
};

const navChildVariants: Variants = {
  animate: {
    y: "10px",
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export default Navbar;
