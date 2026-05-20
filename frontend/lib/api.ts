import axios from "axios";
import { backendUrl } from "@/lib/utils";
import {
  Session,
  SessionCreate,
  SessionPatch,
  UserPatch,
  UserProfile,
} from "@/lib/types";

/**
 * Make a GET request to the backend and return the JSON response.
 */
async function get<T>(path: string): Promise<T> {
  return (await axios.get(`${backendUrl()}${path}`)).data;
}

/**
 * Make an authenticated GET request to the backend and return the JSON response.
 */
async function getAuthed<T>(path: string): Promise<T> {
  return (await axios.get(`${backendUrl()}${path}`, { withCredentials: true }))
    .data;
}

/**
 * Make an authenticated GET request to the backend using the internal API key and return the JSON response.
 */
async function getAuthedInternal<T>(path: string): Promise<T> {
  return (
    await axios.get(`${backendUrl()}${path}`, {
      headers: { Authorization: `Bearer ${process.env.INTERNAL_API_KEY}` },
      withCredentials: true,
    })
  ).data;
}

/**
 * Make an authenticated POST request to the backend and return the JSON response.
 */
async function postAuthed<T>(path: string, body: object): Promise<T> {
  return (
    await axios.post(`${backendUrl()}${path}`, body, { withCredentials: true })
  ).data;
}

/**
 * Make an authenticated PATCH request to the backend and return the JSON response.
 */
async function patchAuthed<T>(path: string, body: object): Promise<T> {
  return (
    await axios.patch(`${backendUrl()}${path}`, body, { withCredentials: true })
  ).data;
}

/**
 * Make an authenticated DELETE request to the backend and return the JSON response.
 */
async function deleteAuthed<T>(path: string): Promise<T> {
  return (
    await axios.delete(`${backendUrl()}${path}`, { withCredentials: true })
  ).data;
}

/**
 * Fetch a user using their ID.
 */
export async function getUser(userId: string): Promise<UserProfile> {
  return await get<UserProfile>(`/users/${userId}`);
}

/**
 * Modify a user with a given ID.
 */
export async function updateUser(
  userId: string,
  body: UserPatch,
): Promise<void> {
  await patchAuthed<void>(`/users/${userId}`, body);
}

/**
 * Get the logged-in user's courses for a specific term.
 */
export async function getCourses(term: string): Promise<string[]> {
  return (await getAuthed<{ rooms: string[] }>(`/courses/${term}`)).rooms;
}

/**
 * Add a new course to a specific term for the logged-in user.
 */
export async function addCourse(
  term: string,
  courseName: string,
): Promise<void> {
  await postAuthed<void>(`/courses/${term}`, { name: courseName });
}

/**
 * Delete a course from the specified term for the logged-in user.
 */
export async function deleteCourse(
  term: string,
  courseName: string,
): Promise<void> {
  await deleteAuthed<void>(
    `/courses/${term}/${encodeURIComponent(courseName)}`,
  );
}

/**
 * Get the study sessions for the logged-in user, with an optional term filter.
 */
export async function getSessions(term: string): Promise<Session[]> {
  // Construct query string
  let queryString = "";
  if (term) {
    queryString += `?term=${term}`;
  }

  // Return sessions
  return (await getAuthed<{ sessions: Session[] }>(`/sessions${queryString}`))
    .sessions;
}

/**
 * Create a new study session as the logged-in user.
 *
 * Returns the newly created session object.
 */
export async function createSession(session: SessionCreate): Promise<Session> {
  return await postAuthed<Session>(`/sessions`, session);
}

/**
 * Edit a study session as the logged-in user.
 */
export async function editSession(
  sessionId: string,
  sessionPatch: SessionPatch,
): Promise<void> {
  await patchAuthed<void>(`/sessions/${sessionId}`, sessionPatch);
}

/**
 * Delete a study session as the logged-in user.
 */
export async function deleteSession(sessionId: string): Promise<void> {
  await deleteAuthed<void>(`/sessions/${sessionId}`);
}
