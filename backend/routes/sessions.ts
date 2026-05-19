import { Router } from "express";

// Create router for route group
const router = Router();

// Stats routes must be registered before /:sessionId to avoid param matching.

/**
 * Get total study hours per day for a given week.
 */
router.get("/stats/daily", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Get total study hours per week for a given term.
 */
router.get("/stats/weekly", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Get total study hours and subject breakdown for a given term.
 */
router.get("/stats/term", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * List all sessions for the authenticated user.
 * Supports optional query filters: subjectId, from, to.
 */
router.get("/", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Start a new study session.
 */
router.post("/", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Get a single session by ID.
 */
router.get("/:sessionId", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * End or update a session (set end time, duration, notes).
 */
router.patch("/:sessionId", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

/**
 * Delete a session.
 */
router.delete("/:sessionId", async (req, res) => {
  res.status(501).json({ code: 501, message: "Not implemented." });
});

// Export router as default export.
export default router;
