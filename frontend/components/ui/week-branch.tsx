import { CourseWithColor } from "@/app/dashboard/page"
import { Session } from "@/lib/types";
import TreeIcon from "@/components/ui/tree-icon";

interface WeekBranchProps {
  x: number, 
  y: number, 
  width: number, 
  justify: string, 
  courses: CourseWithColor[], 
  week: number,
  sessions: Session[],
}

export default function WeekBranch({x, y, width, justify, courses, week, sessions}: WeekBranchProps) {

  /**
   * Returns the types & numbers of icons that should be rendered for a given week & course. 
   */
  function getIcons(course: string, week: number) {
    const total = sessions.filter((s) => s.week === week && s.course === course).reduce((sum, s) => sum + s.duration, 0); 

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
      <div className={`w-full h-[70px] flex flex-row p-0 flex-wrap-reverse items-start ${justify}`}>
        {courses.map((course) => (
          getIcons(course.code, week).map((hours, i) => (
            <div className="w-8 h-8" key={`${course.code}-1-${i}`}>
              <TreeIcon hours={hours} colour={course.color} />
            </div>
          ))
        ))}
      </div>
    </foreignObject>
  )
}