import { Router } from "express";

// Create router for route group
const router = Router();

/**
 * List all subjects for the authenticated user.
 */
router.get("/", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Create a new subject.
 */
router.post("/", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Update a subject.
 */
router.patch("/:subjectId", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Delete a subject.
 */
router.delete("/:subjectId", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

// Export router as default export.
export default router;
