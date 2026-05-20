"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import CourseIcon from "@/components/ui/course-icon";
import TreeIcon from "@/components/ui/tree-icon";
import { CourseDropdownMenu } from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface sessionInterface {
  id: string, 
  course: string, 
  task: string,
  term: string, 
  week: number, 
  sessionTime: string, 
  duration: number
}

export default function Page() {

  const colour1 = "#1d2cff";
  const colour2 = "#ff9dcb"; 
  const colour3 = "#28cdff"; 

  const [currTerm, setCurrTerm] = useState<string>("26T1"); 
  // const sessions = getSessions(); 

  // // per term -> week -> course -> sum duration 
  // const currTermSessions = sessions.rooms.filter((session: sessionInterface) => {session.term === currTerm})
  // const week = 1; 


  return (
    <div className="flex min-h-svh flex-col gap-6 md:p-10 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] ">

      {/* NAVBAR */}
      <div className='flex w-full justify-between flex-row text-white items-center'>
        <h1 className="text-xl font-extrabold tracking-tight">termful.</h1>

        <div className="flex items-center gap-6">
          <CourseDropdownMenu currTerm={currTerm} setCurrTerm={setCurrTerm}></CourseDropdownMenu>
          <Button asChild>
            <Link href="/profile">User Profile</Link>
          </Button>
        </div>
      </div>
      <hr className="w-full border-white/40"/>

      {/* CONTENT */}
      <div className='flex flex-row justify-center items-center gap-40'>
        {/* COURSE LEGEND */}
        <div className="flex flex-col rounded-md border-3 border-white items-left justify-center p-4 pr-10 shadow-xl/80 shadow-cyan-500/50">
          <div className="flex flex-row items-center">
            <CourseIcon colour={colour1}></CourseIcon>
            <h3 className="text-white">course 1</h3>
          </div>

          <div className="flex flex-row items-center">
            <CourseIcon colour={colour2}></CourseIcon>
            <h3 className="text-white">course 2</h3>
          </div>

          <div className="flex flex-row items-center">
            <CourseIcon colour={colour3}></CourseIcon>
            <h3 className="text-white">course 3</h3>
          </div>
        </div>

        {/* TREE */}

        <div className="border-0 flex flex-col items-center gap-6">
          <div className="w-75 h-120 rounded-t-full border-2 border-white-100 bg-gradient-to-b from-violet-400 to-purple-900 flex flex-col items-center justify-center shadow-xl shadow-purple-500/80">
            <svg className="w-75 h-120 border-0 border-white-100">
              <line x1="150" y1="40" x2="150" y2="450" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="70" x2="250" y2="70" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="100" x2="50" y2="100" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="130" x2="270" y2="130" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="160" x2="30" y2="160" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="190" x2="270" y2="190" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="220" x2="30" y2="220" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="250" x2="270" y2="250" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="280" x2="30" y2="280" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="310" x2="270" y2="310" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="340" x2="30" y2="340" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="370" x2="270" y2="370" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="400" x2="30" y2="400" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="430" x2="270" y2="430" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>

              {/* WEEK 1 */}
              <foreignObject x="20" y="30" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-end">
                  {/* {
                    currTermSessions.map((session: sessionInterface) => (
                    session.week === week
                  ))} */}
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                </div>
              </foreignObject>

              {/* WEEK 2 */}
              <foreignObject x="150" y="65" width="150" height="70">
                <div className="border-0 border-white-100 w-[150px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-start">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 3 */}
              <foreignObject x="20" y="95" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-end">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 4 */}
              <foreignObject x="150" y="125" width="150" height="70">
                <div className="border-0 border-white-100 w-[150px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-start">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 5 */}
              <foreignObject x="20" y="155" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-end">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 6 */}
              <foreignObject x="150" y="185" width="150" height="70">
                <div className="border-0 border-white-100 w-[150px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-start">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 7 */}
              <foreignObject x="20" y="210" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-end">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 8 */}
              <foreignObject x="150" y="245" width="150" height="70">
                <div className="border-0 border-white-100 w-[150px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-start">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 9 */}
              <foreignObject x="20" y="275" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-end justify-end">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 10 */}
              <foreignObject x="150" y="305" width="150" height="70">
                <div className="border-0 border-white-100 w-[150px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-start">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 11 */}
              <foreignObject x="20" y="335" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-end justify-end">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="6" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

              {/* WEEK 12 */}
              <foreignObject x="150" y="365" width="150" height="70">
                <div className="border-0 border-white-100 w-[150px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-start justify-start">
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour1} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour2} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="2" colour={colour3} /></div>
                  <div className="w-8 h-8"><TreeIcon hours="4" colour={colour1} /></div>
                </div>
              </foreignObject>

            </svg>
          </div>

          <Button asChild className="border-2 border-white-100 p-6 rounded-md bg-purple-800 flex justify-center items-center hover:bg-purple-900 hover:scale-105">
            <Link href="/timer" className="text-lg text-white font-semibold">Start Timer</Link>
          </Button>
  
        </div>

        {/* ICON LEGEND */}
        <div className="flex flex-col rounded-md border-3 border-white items-left p-4 pr-10 text-white shadow-xl/80 shadow-purple-500/50">
          <div className="flex flex-row items-center">
            <div className="w-15 h-15 border-white-100 border-0"><TreeIcon hours="2" colour="white"/></div>
            {/* <img src="/assignment-star.svg"></img> */}
            <h3> 0-2 hours</h3>
          </div>

          <div className="flex flex-row items-center">
            <div className="w-15 h-15 border-white-100 border-0"><TreeIcon hours="4" colour="white"/></div>
            <h3> 2-4 hours </h3>
          </div>

          <div className="flex flex-row items-center">
            <div className="w-15 h-15 border-white-100 border-0"><TreeIcon hours="6" colour="white"/></div>
            <h3> 4-6 hours </h3>
          </div>
        </div>
        
      </div>

    </div>
  )
}