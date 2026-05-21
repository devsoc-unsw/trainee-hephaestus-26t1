import { Router, type Request } from "express";
import { getUser, updateUser } from "../queries/users.ts";
import { requireAuth } from "../utils/middleware.ts";
import { userNotFound } from "../utils/responses.ts";
import type { UserPatch } from "../utils/types.ts";

// Define type for a request with the user ID parameter.
type userIdReq = Request<{ userId: string }>;

// Create router for route group
const router = Router();

/**
 * Fetch a user using their ID.
 */
router.get("/:userId", async (req, res) => {
  // Get user ID from path
  const userId = req.params.userId;

  // Get user
  const user = await getUser(userId);

  // Check if user exists
  if (user) {
    res.status(200).json(user);
  } else {
    return userNotFound(res);
  }
});

// Use auth middleware
router.use(requireAuth);

/**
 * Modify the user with the given ID.
 */
router.patch("/:userId", async (req: userIdReq, res) => {
  // Get user from request
  const user = req.authUser;

  // Check if user is authenticated
  if (user) {
    // Get user ID
    const userId = req.params.userId;

    // Get user
    const user = await getUser(userId);

    // Check if user exists
    if (!user) {
      return userNotFound(res);
    }

    // Get body
    const body: UserPatch = req.body;

    // Check for length issues
    if (body.name && (body.name.length > 32 || body.name.length < 3)) {
      return res.status(422).json({
        code: 422,
        message: "Name must be between 3 and 32 characters.",
      });
    }
    if (body.major && body.major.length === 0) {
      return res.status(422).json({
        code: 422,
        message:
          "Major cannot be empty. Please provide null if you wish to unset the user's major.",
      });
    }

    // Edit room
    await updateUser(userId, body.name, body.year, body.major);

    // Return success
    res.sendStatus(204);
  }
});

// Export router as default export.
export default router;
