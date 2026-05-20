"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import CourseIcon from "@/components/ui/course-icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import TreeIcon from "@/components/ui/tree-icon";
import { CourseDropdownMenu } from "@/components/ui/dropdown-menu";
import { Plus, Trash, X, CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourses, getSessions } from "@/lib/api";
import { Session } from "@/lib/types";
import WeekBranch from "@/components/ui/week-branch";

type Course = {
  id: number;
  code: string;
};
export type CourseWithColor = Course & {
  color: string;
};

export default function Page() {
  const colour1 = "#1d2cff";
  const colour2 = "#ff9dcb";
  const colour3 = "#28cdff";

  const [term, setTerm] = useState("26T1"); 

  // COURSES 
  const courseColors = ["#1d2cff", "#ff9dcb", "#28cdff"];

  const assignColors = (courses: Course[]) => {
    return courses.map((course, index) => ({
      ...course,
      color: courseColors[index % courseColors.length],
    }));
  };
  const [courses, setCourses] = useState<CourseWithColor[]>([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await getCourses(term); 
      const courses = data.map((code, index) => ({
        id: index + 1, 
        code
      }))
      const coloredCourses = assignColors(courses);
      setCourses(coloredCourses);
    }
    loadCourses();
  }, []);

  const [isAddCourse, setIsAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState("");
  const courseLength = courses.length;
  const getAvailableColor = () => {
    const usedColors = courses.map((course) => course.color);

    return courseColors.find((color) => !usedColors.includes(color));
  };
  
  /**
   * Add New Course
   */
  const addCourse = () => {
    const formatted = newCourse.trim().toUpperCase();
    if (!formatted) return;
    const duplicate = courses.some((course) => course.code === formatted);
    if (duplicate) return;

    const availableColor = getAvailableColor();
    if (!availableColor) return;
    const newItem: CourseWithColor = {
      id: Date.now(), // current id
      code: formatted,
      color: availableColor,
    };
    setCourses([...courses, newItem]);

    setNewCourse("");
    setIsAddCourse(false);
  };

  /**
   * Remove Course
   */
  const removeCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };


  // SESSIONS 
  const [sessions, setSessions] = useState<Session[]>([]); 

  useEffect(() => {
    async function loadSessions() {
      const data = await getSessions(term); 
      setSessions(data); 
    }
    loadSessions(); 
  }); 

  

  return (
    <div className="flex min-h-svh flex-col gap-6 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] md:p-10">
      {/* NAVBAR */}
      <div className='flex w-full justify-between flex-row text-white items-center'>
        <h1 className="text-xl font-extrabold tracking-tight">termful.</h1>

        <div className="flex items-center gap-6">
          <CourseDropdownMenu currTerm={term} setCurrTerm={setTerm}></CourseDropdownMenu>
          <Button asChild>
            <Link href="/profile">User Profile</Link>
          </Button>
        </div>
      </div>
      <hr className="w-full border-white/40" />

      {/* CONTENT */}
      <div className="flex flex-row items-center justify-center gap-40">
        {/* COURSE LEGEND */}
        <div className="items-left relative flex h-auto w-70 flex-col justify-center rounded-md border-3 border-white p-4 shadow-xl/80 shadow-cyan-500/50">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* ICON */}
              <div className="flex w-15 justify-center">
                <CourseIcon colour={course.color} />
              </div>

              {/* COURSE NAME */}
              <div className="min-w-0 flex-1">
                <span className="break-all text-white">{course.code}</span>
              </div>

              {/* ACTION */}
              <div className="flex w-8 justify-center">
                <button
                  className="flex-end flex rounded-full border border-purple-500/20 bg-purple-500/10 p-2 transition-transform duration-200 hover:scale-110"
                  onClick={() => removeCourse(course.id)}
                >
                  <Trash className="h-3 w-3 text-purple-300" />
                </button>
              </div>
            </div>
          ))}

          {courseLength < 3 && (
            <div className="flex items-center gap-2">
              {isAddCourse ? (
                <>
                  {/* INPUT AREA */}
                  <div className="flex-1">
                    <InputGroup className="bg-white">
                      <InputGroupInput
                        placeholder="Enter course..."
                        className="h-8 w-10 px-2 py-1 text-sm"
                        value={newCourse}
                        onChange={(e) => {
                          setNewCourse(e.target.value);
                        }}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          variant="secondary"
                          className="text-sm"
                          onClick={addCourse}
                        >
                          <CornerDownLeft />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>

                  {/* CANCEL BUTTON */}
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10 transition-transform duration-200 hover:scale-110"
                    onClick={() => {
                      setIsAddCourse(false);
                    }}
                  >
                    <X className="h-3 w-3 text-purple-300" />
                  </button>
                </>
              ) : (
                /* ADD COURSE BUTTON */
                <Button className="w-full" onClick={() => setIsAddCourse(true)}>
                  <Plus />
                  Add Course
                </Button>
              )}
            </div>
          )}
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

              <WeekBranch x={20} y={30}  width={130} justify="justify-end" courses={courses} week={1} sessions={sessions} />
              <WeekBranch x={150} y={65}  width={150} justify="justify-start" courses={courses} week={2} sessions={sessions} />
              <WeekBranch x={20} y={95}  width={130} justify="justify-end" courses={courses} week={3} sessions={sessions} />
              <WeekBranch x={150} y={125} width={150} justify="justify-start" courses={courses} week={4} sessions={sessions} />
              <WeekBranch x={20} y={155} width={130} justify="justify-end" courses={courses} week={5} sessions={sessions} />
              <WeekBranch x={150} y={185} width={150} justify="justify-start" courses={courses} week={6} sessions={sessions} />
              <WeekBranch x={20} y={210} width={130} justify="justify-end" courses={courses} week={7} sessions={sessions} />
              <WeekBranch x={150} y={245} width={150} justify="justify-start" courses={courses} week={8} sessions={sessions} />
              <WeekBranch x={20} y={275} width={130} justify="justify-end" courses={courses} week={9} sessions={sessions} />
              <WeekBranch x={150} y={305} width={150} justify="justify-start" courses={courses} week={10} sessions={sessions}/>
              <WeekBranch x={20} y={335} width={130} justify="justify-end" courses={courses} week={11} sessions={sessions}/>
              <WeekBranch x={150} y={365} width={150} justify="justify-start" courses={courses} week={12} sessions={sessions} />
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
  );
}
