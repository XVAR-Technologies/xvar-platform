"use client";

import React, { useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Botany",
  "Biology",
  "English",
  "History",
  "Zoology",
  "Classical Physics",
  "Quantum Physics",
  "Geology",
  "Computer Science",
  "Economics",
  "Fluid Mechanics",
  "Materials Physics",
  "High Energy Physics",
  "Geophysics",
  "Optical Physics",
  "Astrophysics",
  "Plasma Physics",
  "Biophysics",
  "Acoustics",
];

const Carosel = () => {
  const [active, setActive] = useState("Mathematics");
  const radius = 1000;
  const arcLength = 360 / subjects.length;

  const activeIndex = subjects.indexOf(active);

  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center">
      <div className="absolute left-[10%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-x-[90px]">
          <div className="flex flex-col gap-y-6">
            <BsFillBookmarkHeartFill className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
            <FaBook className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
            <AiFillHome className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
            <AiOutlineGlobal className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
          </div>
        </div>
      </div>
      <div className="relative w-[80%] h-[80%] transform-translate-y-1/2 overflow-hidden">
        <div className="relative -left-[70%] w-full h-full flex items-center justify-center">
          {subjects.map((subject, index) => {
            const angle = ((index - activeIndex) / subjects.length) * 180;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            const isActive = subject === active;

            const scale = isActive ? 1.5 : 1;
            const zIndex = isActive ? 1 : 0;
            const opacity = isActive ? 1 : 0.7;

            return (
              <div
                key={subject}
                className={`select-none cursor-pointer absolute w-[400px] text-slate-600 text-[32px] font-bold transition-transform delay-1000 ${
                  isActive && "text-white"
                }`}
                style={{
                  transform: `translate(-50%, -50%) translate(${
                    isActive ? x + 120 : x
                  }px, ${y}px) rotate(${angle}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: `transform .5s, opacity 0.5s`,
                }}
                onClick={() => setActive(subject)}
              >
                {subject}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carosel;
