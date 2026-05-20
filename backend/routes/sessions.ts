import { Router, type Request } from "express";
import { requireAuth } from "../utils/middleware.ts";
import type { Session, SessionCreate, SessionPatch } from "../utils/types.ts";
import {
  deleteSession,
  getSessions,
  getSessionsForTerm,
  sessionExists,
} from "../queries/sessions.ts";

// Define type for a request with the session ID parameter.
type sessionIdReq = Request<{ sessionId: string }>;

// Create router for route group
const router = Router();

// Use auth middleware
router.use(requireAuth);

/**
 * Get the sessions for a given user.
 */
router.get("/", async (req, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get term
    const term = req.query.term;

    // Check if a term was provided
    let sessions: Session[] = [];
    if (typeof term === "string") {
      sessions = await getSessionsForTerm(user.id, term);
    } else {
      sessions = await getSessions(user.id);
    }

    // Return success
    res.status(200).json({ sessions });
  }
});

/**
 * Create a new session.
 */
router.post("/", async (req, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get request body
    const body: SessionCreate = req.body;

    // TODO: Create session

    // Return success
    res.status(201);
  }
});

/**
 * Update an existing session
 */
router.patch("/:sessionId", async (req: sessionIdReq, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get session ID
    const sessionId = BigInt(req.params.sessionId);

    // Get request body
    const body: SessionPatch = req.body;

    // TODO: Update session (Not planned for MVP)

    // Return success
    res.status(204);
  }
});

/**
 * Delete an existing session.
 */
router.delete("/:sessionId", async (req: sessionIdReq, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get session ID
    const sessionId = BigInt(req.params.sessionId);

    // Check if the session exists for the user.
    if (!(await sessionExists(user.id, sessionId))) {
      return res.status(404).json({
        code: 404,
        message: "The user does not have a session with the given ID.",
      });
    }

    // Delete session
    await deleteSession(sessionId);

    // Return success
    res.sendStatus(204);
  }
});

// Export router as default export.
export default router;
