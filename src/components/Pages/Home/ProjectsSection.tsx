import { motion, MotionValue, Variants } from "framer-motion";
import { useMemo, useRef } from "react";
import livewire from "../../../assets/svg/Livewire.svg";
import alpine from "../../../assets/svg/Alpine.js.svg";
import tailwind from "../../../assets/svg/TailwindCSS.svg";
import postgre from "../../../assets/svg/PostgresSQL.svg";
import python from "../../../assets/svg/Python.svg";
import laravel from "../../../assets/svg/Laravel.svg";
import angular from "../../../assets/svg/Angular.svg";
import experss from "../../../assets/svg/Express.svg";
import nodeJS from "../../../assets/svg/Node.js.svg";
import mysql from "../../../assets/svg/MySQL.svg";
import sqlServer from "../../../assets/svg/Microsoft SQL Server.svg";
import bootstrap from "../../../assets/svg/Bootstrap.svg";
import sequelize from "../../../assets/svg/Sequelize.svg";
import { useAnimationOnce } from "../../../hooks";

interface ProjectsSectionProps {
  deviceSize: { height: number; width: number };
  projectTranslateX: MotionValue<number>;
}

const ProjectsSection = ({
  deviceSize,
  projectTranslateX,
}: ProjectsSectionProps) => {
  // console.log("projects.length", projects.length);
  const height = useMemo(
    () =>
      Math.floor(deviceSize.height * (deviceSize.height > 768 ? 0.7 : 0.75)),
    [deviceSize.height],
  );

  const width = useMemo(
    () => Math.floor(deviceSize.width * (deviceSize.width > 768 ? 0.7 : 0.8)),
    [deviceSize.width],
  );

  const refProject1 = useRef(null);

  const hasAnimatedRef = useAnimationOnce(refProject1);

  const refProject2 = useRef(null);
  const hasAnimatedRef2 = useAnimationOnce(refProject2);

  const refProject3 = useRef(null);
  const hasAnimatedRef3 = useAnimationOnce(refProject3);

  const ref = [refProject1, refProject2, refProject3];
  const hasAnmiated = [hasAnimatedRef, hasAnimatedRef2, hasAnimatedRef3];

  return (
    <div
      // className={`min-h-[${deviceSize.height}px] sticky top-0 overflow-hidden px-8 pt-28 md:px-16 md:pt-36`}
      className={`h-[${deviceSize.height}px] sticky top-0 overflow-hidden px-8 pt-28 md:px-16 md:pt-36`}
    >
      <h2 className="pb-4 text-center text-3xl font-extrabold text-slate-100 md:text-5xl">
        SELECTED PROJECT
      </h2>
      <motion.div
        className="relative flex gap-x-4 md:gap-x-16"
        style={{
          x: projectTranslateX,
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            ref={ref[index]}
            className={`relative flex shrink-0 flex-col gap-y-2 rounded-md border border-slate-100 bg-slate-700 p-2 text-slate-100 shadow-md md:gap-y-4 md:p-16`}
            style={{
              height,
              width,
            }}
          >
            <div className="flex flex-col text-3xl font-extrabold md:w-11/12 md:text-6xl xl:w-4/5 xl:text-7xl">
              <motion.p className="text-start">{project.title1}</motion.p>
              <motion.p className="text-end">{project.title2}</motion.p>
            </div>
            <div className="flex font-semibold md:w-11/12 md:text-lg xl:w-4/5">
              <motion.p
                initial="initial"
                animate={`${hasAnmiated[index] ? "animate" : ""}`}
                className="text-justify"
              >
                {project.desc.split(" ").map((str: string, index: number) => (
                  <motion.span
                    custom={index}
                    variants={variantsProject}
                    key={index}
                  >
                    {str + " "}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            <div
              ref={ref[index]}
              className="absolute bottom-5 mx-2 flex flex-wrap justify-start gap-4 md:right-5 md:justify-end"
            >
              {project.svg.map((svg, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-start"
                >
                  <motion.img
                    className="h-10 w-10 md:h-14 md:w-14"
                    drag
                    loading="lazy"
                    dragConstraints={ref[index]}
                    dragElastic={0.1}
                    src={svg}
                    alt={`assessment-icon-${index}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const variantsProject: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (i: number) => {
    return {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
      },
    };
  },
};

export default ProjectsSection;

const assessmentSVG = [laravel, livewire, alpine, tailwind, postgre];
const assessmentDesc = `The application is designed to assess the Key Performance Indicators (KPI) of each employee, with questions and answers th1at can be customized based on their position and department. The system ensures more relevant and focused evaluations, as each employee will only answer questions that align with their responsibilities and roles within the organization. The application is built using technologies such as Laravel, Livewire, AlpineJS, Tailwind CSS, and PostgreSQL`;

const neopSVG = [laravel, livewire, alpine, python, tailwind, postgre];
const neopDesc = `This application is designed to store and manage candidate data in scanned PDF format. It not only stores the data but also analyzes the quality of the uploaded PDF files, particularly to determine whether the text in the document is readable. To efficiently manage this process, the application utilizes the concepts of Laravel Queue and Laravel Batching.`;

const marketVisitSVG = [
  angular,
  nodeJS,
  experss,
  python,
  bootstrap,
  mysql,
  sqlServer,
  sequelize,
];

const marketVisitDesc =
  "This application is designed to assist in scheduling visits to branches and distributors and recording the results of those visits. Visit data can be uploaded in various formats, such as photos, PDFs, and Excel files, allowing for flexible information documentation. Additionally, the application is equipped with a sentiment analysis feature using a Transformer model to analyze responses from the annual survey.";

const projects = [
  {
    desc: assessmentDesc,
    svg: assessmentSVG,
    title1: "ASSESSMENT",
    title2: "APPLICATION",
  },
  {
    desc: neopDesc,
    svg: neopSVG,
    title1: "NEW EMPLOYMENT",
    title2: "APPLICATION",
  },
  {
    desc: marketVisitDesc,
    svg: marketVisitSVG,
    title1: "MARKET VISIT",
    title2: "APPLICATION",
  },
];
