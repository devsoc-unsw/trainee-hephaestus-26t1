"use client";
import { Button } from "@/components/ui/button";
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
import { getCourses, getSessions, addCourse, deleteCourse } from "@/lib/api";
import { Session } from "@/lib/types";
import { useAuth } from "../providers/AuthProvider";
import { redirect } from "next/navigation";
import { TreeLeaf } from "@/components/ui/week-branch";

type Course = {
  id: number;
  code: string;
};
export type CourseWithColor = Course & {
  color: string;
};

// Helper to calculate current UNSW term based on today's date (e.g. "26T2")
const getCurrentTerm = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = date.getMonth() + 1; // 1-12

  let term = "T1";
  if (month >= 6 && month <= 8) term = "T2"; // June - Aug
  if (month >= 9) term = "T3";

  return `${year}${term}`;
};

export default function Page() {
  const { session } = useAuth();

  // If user is not logged in, redirect to sign-in page
  if (session === null) {
    redirect("/signin");
  }

  const [term, setTerm] = useState(getCurrentTerm());

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
        code,
      }));
      const coloredCourses = assignColors(courses);
      setCourses(coloredCourses);
    }
    loadCourses();
  }, [term]);

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
  const addNewCourse = () => {
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
    addCourse(term, formatted);
  };

  /**
   * Remove Course
   */
  const removeCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
    const toDelete = courses.find((course) => course.id === id)?.code;
    if (toDelete) {
      deleteCourse(term, toDelete);
    }
  };

  // SESSIONS
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function loadSessions() {
      const data = await getSessions(term);
      setSessions(data);
    }
    loadSessions();
  }, [term]);

  return (
    <div className="flex min-h-svh flex-col gap-6 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] md:p-10">
      {/* NAVBAR */}
      <div className="flex w-full flex-row items-center justify-between text-white">
        <h1 className="text-xl font-extrabold tracking-tight">termful.</h1>

        <div className="flex items-center gap-6">
          <CourseDropdownMenu
            currTerm={term}
            setCurrTerm={setTerm}
          ></CourseDropdownMenu>
          <Button variant="outline" className="bg-opacity-20" asChild>
            <Link href="/profile" className="text-purple-100">
              User Profile
            </Link>
          </Button>
        </div>
      </div>
      <hr className="w-full border-white/40" />

      {/* CONTENT */}
      <div className="flex flex-row items-center justify-center gap-35">
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
                          onClick={addNewCourse}
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
        <div className="flex flex-col items-center gap-6 border-0">
          <svg className="border-white-100 h-[620px] w-[400px] border-0">
            {/* FLOWER */}
            <line
              x1="200"
              y1="150"
              x2="200"
              y2="700"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="1"
            />
            <circle cx="200" cy="85" r="80" fill="#8600cf" />
            <foreignObject
              x="150"
              y="35"
              width="100"
              height="100"
              className="border-white-100 border-0"
            >
              <Button
                asChild
                variant="secondary"
                className="text-md h-25 w-25 rounded-full border-4 border-white bg-radial from-purple-600 to-blue-800 text-center font-extrabold text-white hover:from-purple-400"
              >
                <Link href="/timer">focus</Link>
              </Button>
            </foreignObject>

            {/* BRANCHES */}
            <line
              x1="200"
              y1="188"
              x2="300"
              y2="188"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="225"
              x2="100"
              y2="225"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="263"
              x2="300"
              y2="263"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="300"
              x2="100"
              y2="300"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="338"
              x2="300"
              y2="338"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="375"
              x2="100"
              y2="375"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="413"
              x2="300"
              y2="413"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="450"
              x2="100"
              y2="450"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="488"
              x2="300"
              y2="488"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="525"
              x2="100"
              y2="525"
              stroke="#EFC2FF"
              strokeWidth={2}
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* LEAVES */}
            <TreeLeaf
              x={20}
              y={160}
              justify="justify-end"
              courses={courses}
              week={9}
              sessions={sessions}
              fill="bg-indigo-500"
              br="50% 100px 0 80px"
            ></TreeLeaf>
            <TreeLeaf
              x={0}
              y={236}
              justify="justify-end"
              courses={courses}
              week={7}
              sessions={sessions}
              fill="bg-purple-600"
              br="50% 100px 0 80px"
            ></TreeLeaf>
            <TreeLeaf
              x={35}
              y={311}
              justify="justify-end"
              courses={courses}
              week={5}
              sessions={sessions}
              fill="bg-purple-500"
              br="50% 100px 0 80px"
            ></TreeLeaf>
            <TreeLeaf
              x={20}
              y={386}
              justify="justify-end"
              courses={courses}
              week={3}
              sessions={sessions}
              fill="bg-indigo-400"
              br="50% 100px 0 80px"
            ></TreeLeaf>
            <TreeLeaf
              x={40}
              y={461}
              justify="justify-end"
              courses={courses}
              week={1}
              sessions={sessions}
              fill="bg-purple-600"
              br="50% 100px 0 80px"
            ></TreeLeaf>

            <TreeLeaf
              x={255}
              y={124}
              justify="justify-end"
              courses={courses}
              week={10}
              sessions={sessions}
              fill="bg-purple-500"
              br="100px 50% 80px 0"
            ></TreeLeaf>
            <TreeLeaf
              x={225}
              y={199}
              justify="justify-end"
              courses={courses}
              week={8}
              sessions={sessions}
              fill="bg-indigo-500"
              br="100px 50% 80px 0"
            ></TreeLeaf>
            <TreeLeaf
              x={240}
              y={274}
              justify="justify-end"
              courses={courses}
              week={6}
              sessions={sessions}
              fill="bg-purple-600"
              br="100px 50% 80px 0"
            ></TreeLeaf>
            <TreeLeaf
              x={220}
              y={349}
              justify="justify-end"
              courses={courses}
              week={4}
              sessions={sessions}
              fill="bg-indigo-600"
              br="100px 50% 80px 0"
            ></TreeLeaf>
            <TreeLeaf
              x={235}
              y={424}
              justify="justify-end"
              courses={courses}
              week={2}
              sessions={sessions}
              fill="bg-purple-600"
              br="100px 50% 80px 0"
            ></TreeLeaf>
          </svg>
        </div>

        {/* ICON LEGEND */}
        <div className="items-left flex flex-col rounded-md border-3 border-white p-4 pr-10 text-white shadow-xl/80 shadow-purple-500/50">
          <div className="flex flex-row items-center">
            <div className="border-white-100 h-15 w-15 border-0">
              <TreeIcon hours="2" colour="white" />
            </div>
            <h3> 0-2 hours</h3>
          </div>

          <div className="flex flex-row items-center">
            <div className="border-white-100 h-15 w-15 border-0">
              <TreeIcon hours="4" colour="white" />
            </div>
            <h3> 2-4 hours </h3>
          </div>

          <div className="flex flex-row items-center">
            <div className="border-white-100 h-15 w-15 border-0">
              <TreeIcon hours="6" colour="white" />
            </div>
            <h3> 4-6 hours </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
