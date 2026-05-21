import { Router, type Request } from "express";
import { requireAuth } from "../utils/middleware.ts";
import type { CourseCreate } from "../utils/types.ts";
import {
  createCourse,
  deleteCourse,
  getUserCourses,
  userHasCourse,
} from "../queries/courses.ts";

// Define type for a request with the term parameter.
type termReq = Request<{ term: string }>;

// Define type for a request with the term and course parameters.
type termCourseReq = Request<{ term: string; course: string }>;

// Create router for route group
const router = Router();

// Use auth middleware
router.use(requireAuth);

/**
 * Get the courses for a user's term.
 */
router.get("/:term", async (req: termReq, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get term
    const term = req.params.term;

    // Get all courses for user in provided term.
    const courses = await getUserCourses(user.id, term);

    // Return success
    res.status(200).json({ courses });
  }
});

/**
 * Add a new course to the specified term.
 */
router.post("/:term", async (req: termReq, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get term
    const term = req.params.term;

    // Get course name from request body.
    const courseName = (req.body as CourseCreate).name;

    // Check if user is already enrolled in course for the term.
    if (await userHasCourse(user.id, term, courseName)) {
      return res.status(409).json({
        code: 409,
        message: "User is already enrolled in this course for this term.",
      });
    }

    // Add course to term
    await createCourse(user.id, term, courseName);

    // Return success
    res.status(201);
  }
});

/**
 * Delete a course from the specified term.
 */
router.delete("/:term/:course", async (req: termCourseReq, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get term and course name
    const term = req.params.term;
    const courseName = req.params.course;

    // Check if user is not enrolled in the course for the term.
    if (!(await userHasCourse(user.id, term, courseName))) {
      return res.status(404).json({
        code: 404,
        message:
          "The user is not enrolled in the provided course for the given term.",
      });
    }

    // Remove course from user's term
    await deleteCourse(user.id, term, courseName);

    // Return success
    res.sendStatus(204);
  }
});

// Export router as default export.
export default router;
