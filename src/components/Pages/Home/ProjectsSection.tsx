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
import { getRandomXY } from "../../../utils";

interface ProjectsSectionProps {
  deviceSize: { height: number; width: number };
  projectTranslateX: MotionValue<number>;
}

const ProjectsSection = ({
  deviceSize,
  projectTranslateX,
}: ProjectsSectionProps) => {
  const randomXY = useMemo(() => getRandomXY(marketVisitSVG.length), []);

  const refProject1 = useRef(null);
  const hasAnimatedRef = useAnimationOnce(refProject1);

  const refProject2 = useRef(null);
  const hasAnimatedRef2 = useAnimationOnce(refProject2);

  const refProject3 = useRef(null);
  const hasAnimatedRef3 = useAnimationOnce(refProject3);

  // console.log("hasAnimatedRef", hasAnimatedRef);

  return (
    <div
      className={`min-h-[${deviceSize.height}px] sticky top-0 min-w-full overflow-hidden pt-28 md:pt-36`}
    >
      <h2 className="pb-4 text-center text-3xl font-extrabold text-slate-100 md:text-5xl">
        SELECTED PROJECT
      </h2>
      <motion.div
        className="relative flex gap-x-4 md:gap-x-16"
        style={{
          x: projectTranslateX,
          height: `${deviceSize.height}px`,
          width: `${deviceSize.width}px`,
        }}
      >
        <motion.div
          ref={refProject1}
          className="relative ml-8 flex shrink-0 flex-col gap-x-8 gap-y-2 rounded-md border border-slate-100 bg-slate-700 p-2 text-slate-100 shadow-md md:ml-40 md:gap-y-4 md:p-16"
          style={{
            // height: `${Math.floor(deviceSize.height * 0.7)}px`,
            height: `${Math.floor(
              deviceSize.height * (deviceSize.height > 768 ? 0.7 : 0.8),
            )}px`,
            width: `${Math.floor(
              deviceSize.width * (deviceSize.width > 768 ? 0.7 : 0.8),
            )}px`,
          }}
        >
          <div className="flex flex-col text-3xl font-extrabold md:w-2/3 md:text-7xl">
            <motion.p
              initial={intialProject}
              animate={hasAnimatedRef ? animateProject : ""}
              className="text-start"
            >
              ASSESSMENT
            </motion.p>
            <motion.p
              initial={intialProjectN}
              animate={hasAnimatedRef ? animateProject : ""}
              className="text-end"
            >
              APPLICATION
            </motion.p>
          </div>
          <div className="flex font-semibold md:w-4/5 md:text-lg">
            <motion.p
              initial="initial"
              animate={`${hasAnimatedRef ? "animate" : ""}`}
              className="text-justify"
            >
              {assessmentDesc.split(" ").map((str: string, index: number) => (
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
            ref={refProject1}
            className="absolute bottom-5 mx-2 flex flex-wrap justify-start gap-4 md:right-5 md:justify-end"
          >
            {assessmentSVG.map((svg, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-start"
              >
                <motion.img
                  className="h-10 w-10 md:h-14 md:w-14"
                  drag
                  dragConstraints={refProject1}
                  dragElastic={0.1}
                  src={svg}
                  alt={`assessment-icon-${index}`}
                  style={{
                    x: randomXY[index].x,
                    y: randomXY[index].y,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={refProject2}
          className="relative flex shrink-0 flex-col gap-x-8 gap-y-2 rounded-md border border-slate-100 bg-slate-700 p-2 text-slate-100 shadow-md md:gap-y-4 md:p-16"
          style={{
            height: `${Math.floor(
              deviceSize.height * (deviceSize.height > 768 ? 0.7 : 0.8),
            )}px`,
            width: `${Math.floor(
              deviceSize.width * (deviceSize.width > 768 ? 0.7 : 0.8),
            )}px`,
          }}
        >
          <div className="flex flex-col text-3xl font-extrabold md:w-3/4 md:text-7xl">
            <motion.p
              initial={intialProject}
              animate={hasAnimatedRef2 ? animateProject : ""}
              className="text-start"
            >
              NEW EMPLOYMENT
            </motion.p>
            <motion.p
              initial={intialProjectN}
              animate={hasAnimatedRef2 ? animateProject : ""}
              className="text-end"
            >
              APPLICATION
            </motion.p>
          </div>
          <div className="flex font-semibold md:w-4/5 md:text-lg">
            <motion.p
              initial="initial"
              animate={`${hasAnimatedRef2 ? "animate" : ""}`}
              className="text-justify"
            >
              {neopDesc.split(" ").map((str: string, index: number) => (
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
          <div className="absolute bottom-5 mx-2 flex flex-wrap justify-start gap-4 md:right-5 md:justify-end">
            {neopSVG.map((svg, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-start"
              >
                <motion.img
                  className="h-10 w-10 md:h-14 md:w-14"
                  drag
                  dragConstraints={refProject2}
                  dragElastic={0.1}
                  src={svg}
                  alt={`new-employment-icon-${index}`}
                  style={{
                    x: randomXY[index].x,
                    y: randomXY[index].y,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={refProject3}
          className="relative mr-8 flex shrink-0 flex-col gap-x-8 gap-y-2 rounded-md border border-slate-100 bg-slate-700 p-2 text-slate-100 shadow-md md:mr-40 md:gap-y-4 md:p-16"
          style={{
            height: `${Math.floor(
              deviceSize.height * (deviceSize.height > 768 ? 0.7 : 0.8),
            )}px`,
            width: `${Math.floor(
              deviceSize.width * (deviceSize.width > 768 ? 0.7 : 0.8),
            )}px`,
          }}
        >
          <div className="flex flex-col text-3xl font-extrabold md:w-2/3 md:text-7xl">
            <motion.p
              initial={intialProject}
              animate={hasAnimatedRef3 ? animateProject : ""}
              className="text-start"
            >
              MARKET VISIT
            </motion.p>
            <motion.p
              initial={intialProjectN}
              animate={hasAnimatedRef3 ? animateProject : ""}
              className="text-end"
            >
              APPLICATION
            </motion.p>
          </div>
          <div className="flex font-semibold md:w-4/5 md:text-lg">
            <motion.p
              initial="initial"
              animate={`${hasAnimatedRef3 ? "animate" : ""}`}
              className="text-justify"
            >
              {marketVisitDesc.split(" ").map((str: string, index: number) => (
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
          <div className="absolute bottom-5 mx-2 flex flex-wrap justify-start gap-4 md:right-5 md:justify-end">
            {marketVisitSVG.map((svg, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-start"
              >
                <motion.img
                  className="h-10 w-10 md:h-14 md:w-14"
                  drag
                  dragConstraints={refProject3}
                  dragElastic={0.1}
                  src={svg}
                  alt={`market-visit-icon-${index}`}
                  style={{
                    x: randomXY[index].x,
                    y: randomXY[index].y,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const intialProject = {
  opacity: 0,
  x: -200,
};

const variantsProject: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (i: number) => {
    return {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
      },
    };
  },
};

const intialProjectN = {
  opacity: 0,
  x: 200,
};

const animateProject = {
  opacity: 1,
  x: 0,
  transition: {
    duration: 0.5,
    delay: 0.5,
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
