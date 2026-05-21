import { CourseWithColor } from "@/app/dashboard/page";
import { Session } from "@/lib/types";
import TreeIcon from "@/components/ui/tree-icon";

interface WeekBranchProps {
  x: number;
  y: number;
  width: number;
  justify: string;
  courses: CourseWithColor[];
  week: number;
  sessions: Session[];
}

interface TreeLeafProps {
  x: number;
  y: number;
  justify: string;
  courses: CourseWithColor[];
  week: number;
  sessions: Session[];
  fill: string;
  br: string;
}

function WeekBranch({
  x,
  y,
  width,
  justify,
  courses,
  week,
  sessions,
}: WeekBranchProps) {
  /**
   * Returns the types & numbers of icons that should be rendered for a given week & course.
   */
  function getIcons(course: string, week: number) {
    const total = sessions
      .filter((s) => s.week === week && s.course === course)
      .reduce((sum, s) => sum + s.duration, 0);

    if (total === 0) return [];

    const icons: string[] = [];
    let remaining = total;

    while (remaining >= 6) {
      icons.push("6");
      remaining -= 6;
    }
    while (remaining >= 2) {
      icons.push("4");
      remaining -= 4;
    }
    if (remaining > 0) {
      icons.push("2");
    }
    return icons;
  }

  return (
    <foreignObject x={x} y={y} width={width} height="70">
      <div
        className={`flex h-[70px] w-full flex-row flex-wrap-reverse items-start p-0 ${justify}`}
      >
        {courses.map((course) =>
          getIcons(course.code, week).map((hours, i) => (
            <div className="h-8 w-8" key={`${course.code}-1-${i}`}>
              <TreeIcon hours={hours} colour={course.color} />
            </div>
          )),
        )}
      </div>
    </foreignObject>
  );
}

function TreeLeaf({
  x,
  y,
  justify,
  courses,
  week,
  sessions,
  fill,
  br,
}: TreeLeafProps) {
  /**
   * Returns the types & numbers of icons that should be rendered for a given week & course.
   */
  function getIcons(course: string, week: number) {
    const total = sessions
      .filter((s) => s.week === week && s.course === course)
      .reduce((sum, s) => sum + s.duration / 3600, 0);

    if (total === 0) return [];

    const icons: string[] = [];
    let remaining = total;

    while (remaining >= 6) {
      icons.push("6");
      remaining -= 6;
    }
    while (remaining >= 2) {
      icons.push("4");
      remaining -= 4;
    }
    if (remaining > 0) {
      icons.push("2");
    }
    return icons;
  }

  return (
    <foreignObject x={x} y={y} width="160" height="85">
      <div
        className={`flex h-[65px] w-[140px] flex-row flex-wrap-reverse items-center border-2 border-indigo-200 px-5 py-1 shadow-md shadow-white/50 ${fill} ${justify}`}
        style={{ borderRadius: `${br}` }}
      >
        {courses.map((course) =>
          getIcons(course.code, week).map((hours, i) => (
            <div className="h-6 w-6" key={`${course.code}-1-${i}`}>
              <TreeIcon hours={hours} colour={course.color} />
            </div>
          )),
        )}
      </div>
    </foreignObject>
  );
}

export { WeekBranch, TreeLeaf };
