"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { chapters, subjects } from "@/lib/data/content";
import Image from "next/image";
import "./styles.css";

const Carosel = () => {
  const [activeSubject, setActiveSubject] = useState("Mathematics");
  const [activeChapter, setActiveChapter] = useState("Gravity");
  const subjectRadius = 1000;
  const chapterRadius = 1200;

  const activeSubjectIndex = subjects.indexOf(activeSubject);
  const activeChapterIndex = chapters.findIndex(
    (chapter) => chapter.title === activeChapter
  );

  const subjectHandleSwipe = (direction: string) => {
    if (direction === "Up") {
      const nextSubjectIndex = (activeSubjectIndex + 1) % subjects.length;
      setActiveSubject(subjects[nextSubjectIndex]);
    } else if (direction === "Down") {
      const prevSubjectIndex =
        (activeSubjectIndex - 1 + subjects.length) % subjects.length;
      setActiveSubject(subjects[prevSubjectIndex]);
    }
  };

  const subjectHandleSwipers = useSwipeable({
    onSwipedUp: () => subjectHandleSwipe("Up"),
    onSwipedDown: () => subjectHandleSwipe("Down"),
    trackMouse: true,
    trackTouch: true,
    touchEventOptions: { passive: true },
  });

  const chapterHandleSwipe = (direction: string) => {
    if (direction === "Up") {
      const nextChapterIndex = (activeChapterIndex + 1) % chapters.length;
      setActiveChapter(chapters[nextChapterIndex].title);
    } else if (direction === "Down") {
      const prevChapterIndex =
        (activeChapterIndex - 1 + chapters.length) % chapters.length;
      setActiveChapter(chapters[prevChapterIndex].title);
    }
  };

  const chapterHandlerSwipers = useSwipeable({
    onSwipedUp: () => chapterHandleSwipe("Up"),
    onSwipedDown: () => chapterHandleSwipe("Down"),
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="h-[20px] bg-white"></div>
      <div className="text-white absolute left-20">
        <FaSearch size={50} />
      </div>
      <div className="absolute left-[200px] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center">
          <div className="flex flex-col gap-y-6">
            <BsFillBookmarkHeartFill className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
            <FaBook className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
            <AiFillHome className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
            <AiOutlineGlobal className="text-slate-600 text-2xl hover:drop-shadow-lg hover:text-emerald-400 cursor-pointer transition-all delay-75" />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full overflow-hidden">
        <div
          {...subjectHandleSwipers}
          className="relative right-[100px] w-fit bg-white h-full flex items-center justify-center"
        >
          {subjects.map((subject, index) => {
            const angle =
              ((index - activeSubjectIndex) / subjects.length) * 200;
            const x = Math.cos((angle * Math.PI) / 180) * subjectRadius;
            const y = Math.sin((angle * Math.PI) / 180) * subjectRadius;

            const isSubjectActive = subject === activeSubject;

            const scale = isSubjectActive ? 1.5 : 1;
            const zIndex = isSubjectActive ? 1 : 0;
            const opacity = isSubjectActive ? 1 : 0.7;

            return (
              <div
                key={subject}
                className={`select-none cursor-pointer absolute w-[400px] text-slate-600 text-[32px] font-bold transition-transform delay-1000 ${
                  isSubjectActive && "text-white"
                }`}
                style={{
                  transform: `translate(-50%, -50%) translate(${
                    isSubjectActive ? x + 100 : x
                  }px, ${y}px) rotate(${angle}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: `transform .5s, opacity 0.5s`,
                }}
                onClick={() => setActiveSubject(subject)}
              >
                {subject}
              </div>
            );
          })}
        </div>
        <div
          {...chapterHandlerSwipers}
          className="relative border-collapse bottom-[95%] left-[200px] bg-white w-fit h-full flex items-center justify-center"
        >
          {chapters.map((chapter, index) => {
            const angle =
              ((index - activeChapterIndex) / chapters.length) * 120;
            const x = Math.cos((angle * Math.PI) / 180) * chapterRadius;
            const y = Math.sin((angle * Math.PI) / 180) * chapterRadius;

            const isChapterActive = chapter.title === activeChapter;

            const scale = isChapterActive ? 1.5 : 1;
            const zIndex = isChapterActive ? 1 : 0;
            const opacity = isChapterActive ? 1 : 0.7;

            return (
              <div
                key={chapter.title}
                className={`clip-curve border-0 border-l-2 border-white w-[400px] select-none cursor-pointer absolute text-slate-600 text-[32px] font-bold transition-transform delay-1000 ${
                  isChapterActive && "text-white"
                }`}
                style={{
                  transform: `translate(-50%, -50%) translate(${
                    isChapterActive ? x + 100 : x
                  }px, ${y}px) rotate(${angle}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: `transform .5s, opacity 0.5s`,
                }}
                onClick={() => setActiveChapter(chapter.title)}
              >
                <div className="flex items-center">
                  <div className="relative w-[150px] h-[150px] overflow-hidden object-cover">
                    <Image src="/assets/chapter.svg" fill alt={chapter.title} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base">{chapter.title}</span>
                    <span className="text-sm italic font-extralight">
                      {chapter.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carosel;
