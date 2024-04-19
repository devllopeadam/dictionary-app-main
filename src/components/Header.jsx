/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ArrowDown, Logo, Moon } from "../assets";
import { motion } from "framer-motion";

const Header = () => {
  const HTML = document.querySelector("html");
  const [font, setFont] = useState("serif");
  const [show, setShow] = useState(false);
  const [toggler, setToggler] = useState("light");

  useEffect(() => {
    HTML.classList = localStorage.getItem("theme");
    HTML.dataset.font = localStorage.getItem("font");
    setFont(localStorage.getItem("font"));
    setToggler(localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    HTML.classList = toggler;
    HTML.dataset.font = font;
  }, [toggler, font]);

  const handleToggler = () => {
    const newTheme = toggler === "light" ? "dark" : "light";
    setToggler(newTheme);
    localStorage.setItem("theme", newTheme);
    HTML.classList.toggle("light");
    HTML.classList.toggle("dark");
  };

  const handleFont = (activeFont) => {
    setFont(activeFont);
    HTML.dataset.font = activeFont;
    localStorage.setItem("font", activeFont);
    setShow(false);
  };

  return (
    <div className="flex justify-between items-center text-gray-100">
      <Logo className={"stroke-current text-gray-300 w-6 md:w-8 h-[38px]"} />
      <div className="flex gap-6 h-[30px]">
        <div className="flex gap-3 items-center relative border-r pr-4 border-grey-100 dark:border-white">
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={() => setShow(!show)}>
            <p className="text-[18px] text-info font-bold">{font}</p>
            <img
              className="h-[13px] w-[13px]"
              src={ArrowDown}
            />
          </div>

          {show && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              tabIndex={1}
              onBlur={() => setShow(false)}
              className="p-5 bg-fonts absolute rounded-lg shadow-xl top-[140%] right-0 w-[175px] z-[100]">
              <p
                className="text-info text-[17px] font-medium font-serif pb-3 cursor-pointer hover:text-purple-500 duration-300"
                onClick={() => {
                  handleFont("serif");
                }}>
                Serif
              </p>
              <p
                className="text-info text-[17px] font-medium font-sans-serif pb-3 cursor-pointer hover:text-purple-500 duration-300"
                onClick={() => {
                  handleFont("sans-serif");
                }}>
                Sans Serif
              </p>
              <p
                className="text-info text-[17px] font-medium font-mono cursor-pointer hover:text-purple-500 duration-300"
                onClick={() => {
                  handleFont("mono");
                }}>
                Mono
              </p>
            </motion.div>
          )}
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <div
            className="relative bg-toggler rounded-full w-[42px] h-[20px] hover:bg-purple duration-300"
            onClick={() => handleToggler()}>
            <span
              className={`absolute bg-white w-[14px] h-[14px] rounded-full top-[3px] duration-300 ${
                toggler === "light" ? "left-[3px]" : "left-[25px]"
              }`}></span>
          </div>
          <Moon className={"stroke-current text-toggler w-5 h-[22px]"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
