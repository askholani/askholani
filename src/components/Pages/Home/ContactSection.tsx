import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import cv from "../../../assets/cv.pdf";

interface ContactSectionProps {
  scrollToStartSection: () => void;
  isInView: boolean;
}

const contactMainText = [
  `LET'S`,
  `WORK TOGETHER`,
  `AND`,
  `BUILD SOMETHING COOL`,
];

function shuffle([...array]: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

const ContactSection = ({
  scrollToStartSection,
  isInView,
}: ContactSectionProps) => {
  const [orderedContactMainText, setOderedContactMainText] =
    useState(contactMainText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startShuffle = useCallback(() => {
    if (!intervalRef.current && isInView) {
      intervalRef.current = setInterval(() => {
        setOderedContactMainText(shuffle(contactMainText));
      }, 1500);
    }
  }, [isInView]);

  const stopShuffle = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startShuffle();
    return stopShuffle;
  }, [startShuffle, stopShuffle]);

  return (
    <>
      <div className="absolute bottom-8">
        <ArrowUpIcon
          onClick={scrollToStartSection}
          className="h-12 w-12 font-extrabold md:h-20 md:w-20"
        />
      </div>
      <h2 className="pb-4 text-center text-3xl font-extrabold md:text-5xl">
        CONTACT
      </h2>
      <h3 className="text-4xl font-semibold md:text-6xl">GET IN TOUCH</h3>
      <div className="flex h-full grow flex-col-reverse justify-between gap-x-4 gap-y-4 py-4 md:grid md:grid-cols-6 md:gap-x-0 md:gap-y-0 md:py-0">
        <div className="flex flex-col items-end justify-center gap-y-2 md:col-span-1 md:items-start md:text-lg">
          {contacts.map((contact, i: number) => {
            return (
              <h4 key={i + contact.name}>
                <a href={contact.link}>{contact.name}</a>
              </h4>
            );
          })}
          <h4>
            {/* src\assets\cv.pdf */}
            <a href={cv} download="ibnu-hajar-a.pdf">
              CV
            </a>
          </h4>
        </div>

        <div className="flex flex-col gap-y-8 text-3xl font-light md:col-span-5 md:text-7xl">
          <motion.div
            onHoverStart={stopShuffle}
            onHoverEnd={startShuffle}
            className="flex flex-col items-start gap-y-4"
          >
            {orderedContactMainText.map((text) => (
              <motion.h4
                transition={{ duration: 1, stiffness: 100, damping: 20 }}
                layout
                key={text}
                className={
                  text === `WORK TOGETHER`
                    ? "text-center"
                    : text === `BUILD SOMETHING COOL`
                      ? "text-end"
                      : ""
                }
              >
                {text}
              </motion.h4>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

const contacts = [
  {
    name: "Email",
    link: "mailto:example@gmail.com?subject=Hello&body=I%20would%20like%20to%20connect.",
  },

  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/askholani/",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/ibnu_hajara/",
  },
  {
    name: "GitHub",
    link: "https://github.com/askholani",
  },
];

export default ContactSection;
