import type { Response } from "express";

/**
 * Return a response for a user not being found.
 * @param res The response to modify and return.
 */
export function userNotFound(res: Response): Response {
  return res
    .status(404)
    .json({ code: 404, message: "User with given ID not found." });
}
