import { Button } from "@/components/ui/button";
import CourseIcon from "@/components/ui/course-icon";
import TreeIcon from "@/components/ui/tree-icon";

export default function Page() {
  const blue = "#1d2cff";
  const pink = "#ff9dcb";
  const cyan = "#28cdff";

  return (
    <div className="flex min-h-svh flex-col gap-6 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] md:p-10">
      {/* NAVBAR */}
      <div className="flex w-full flex-row items-center justify-between text-white">
        <h1 className="text-lg font-bold">Termful.</h1>

        <div className="flex items-center gap-6">
          <Button>(Term #)</Button>
          <Button>User Profile</Button>
        </div>
      </div>
      <hr className="w-full border-white/40" />

      {/* CONTENT */}
      <div className="flex flex-row items-center justify-center gap-40">
        {/* COURSE LEGEND */}
        <div className="items-left flex h-50 w-50 flex-col justify-center rounded-md border-3 border-white p-4 shadow-xl/80 shadow-cyan-500/50">
          <div className="flex flex-row items-center">
            <CourseIcon colour={cyan}></CourseIcon>
            <h3 className="text-white">course 1</h3>
          </div>

          <div className="flex flex-row items-center">
            <CourseIcon colour={pink}></CourseIcon>
            <h3 className="text-white">course 2</h3>
          </div>

          <div className="flex flex-row items-center">
            <CourseIcon colour={blue}></CourseIcon>
            <h3 className="text-white">course 3</h3>
          </div>
        </div>

        {/* TREE */}

        <div className="flex flex-col items-center gap-6 border-0">
          <div className="border-white-100 flex h-120 w-75 flex-col items-center justify-center rounded-t-full border-2 bg-gradient-to-b from-violet-400 to-purple-900 shadow-xl shadow-purple-500/80">
            <svg className="border-white-100 h-120 w-75 border-1">
              <line
                x1="150"
                y1="40"
                x2="150"
                y2="450"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="70"
                x2="250"
                y2="70"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="100"
                x2="50"
                y2="100"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="130"
                x2="270"
                y2="130"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="160"
                x2="30"
                y2="160"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="190"
                x2="270"
                y2="190"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="220"
                x2="30"
                y2="220"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="250"
                x2="270"
                y2="250"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="280"
                x2="30"
                y2="280"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="310"
                x2="270"
                y2="310"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="340"
                x2="30"
                y2="340"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="370"
                x2="270"
                y2="370"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="400"
                x2="30"
                y2="400"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="150"
                y1="430"
                x2="270"
                y2="430"
                stroke="#EFC2FF"
                strokeWidth={2}
                strokeLinecap="round"
                opacity="0.3"
              />

              <foreignObject x="30" y="35" width="110" height="70">
                <div className="border-white-100 flex h-[70px] w-[110px] flex-row flex-wrap-reverse items-end justify-end border-0 p-0">
                  <div className="h-8 w-8">
                    <TreeIcon hours="2" colour={blue} opacity="0.8" />
                  </div>
                  <div className="h-8 w-8">
                    <TreeIcon hours="4" colour={pink} opacity="0.8" />
                  </div>
                  <div className="h-8 w-8">
                    <TreeIcon hours="6" colour={pink} opacity="0.8" />
                  </div>
                  <div className="h-8 w-8">
                    <TreeIcon hours="2" colour={cyan} opacity="0.8" />
                  </div>
                  <div className="h-8 w-8">
                    <TreeIcon hours="4" colour={blue} opacity="0.8" />
                  </div>
                  <div className="h-8 w-8">
                    <TreeIcon hours="6" colour={pink} opacity="0.8" />
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
          <div className="h-15 w-20 rounded-md border-2 bg-purple-800"></div>
        </div>

        {/* <div className="w-90 h-150 border-0 flex flex-col items-center">
          <div className="border-0 border-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-90 h-130">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A491FF" />
                  <stop offset="100%" stopColor="#7300A8" />
                </linearGradient>
              </defs>
              <polygon points="180,0 0,500 360,500" fill="url(#grad1)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <line x1="180" y1="80" x2="180" y2="480" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="150" y1="120" x2="210" y2="120" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="130" y1="180" x2="230" y2="180" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="100" y1="250" x2="260" y2="250" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="80" y1="320" x2="280" y2="320" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="50" y1="390" x2="310" y2="390" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>
              <line x1="30" y1="460" x2="330" y2="460" stroke="#EFC2FF" strokeWidth={2} strokeLinecap="round" opacity="0.3"/>

              <foreignObject x="50" y="395" width="130" height="70">
                <div className="border-0 border-white-100 w-[130px] h-[70px] flex flex-row p-0 flex-wrap-reverse items-end justify-end">
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={blue} /></div>
                  <div className="w-8 h-8"><TreeIcon type="lecture" colour={pink} /></div>
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={pink} /></div>
                  <div className="w-8 h-8"><TreeIcon type="lecture" colour={cyan} /></div>
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={blue} /></div>
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={pink} /></div>
                </div>
              </foreignObject>

              <foreignObject x="180" y="325" width="130" height="70">
                <div className="border- border-white-100 w-[130px] h-[70px] flex flex-row gap-0 flex-wrap-reverse">
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={blue} opacity="0.2" /></div>
                  <div className="w-8 h-8"><TreeIcon type="lecture" colour={cyan} opacity="0.5"/></div>
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={pink} /></div>
                  <div className="w-8 h-8"><TreeIcon type="lecture" colour={pink} /></div>
                  <div className="w-8 h-8"><TreeIcon type="assignment" colour={cyan} /></div>
                  <div className="w-8 h-8"><TreeIcon type="lecture" colour={pink} /></div>
                </div>
              </foreignObject>
            </svg>
          </div>

          <div className="border-2 w-15 h-12 rounded-md bg-purple-800"></div>

        </div> */}

        {/* ICON LEGEND */}
        <div className="items-left flex h-40 w-50 flex-col rounded-md border-3 border-white p-4 text-white shadow-xl/80 shadow-purple-500/50">
          <div className="flex flex-row items-center">
            <div className="border-white-100 h-15 w-15 border-0">
              <TreeIcon hours="2" colour="white" opacity="100" />
            </div>
            {/* <img src="/assignment-star.svg"></img> */}
            <h3>Assignments</h3>
          </div>

          <div className="flex flex-row items-center">
            <div className="border-white-100 h-15 w-15 border-0">
              <TreeIcon hours="4" colour="white" opacity="100" />
            </div>
            <h3>Lectures & Tutorials</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
