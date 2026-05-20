import axios from "axios";
import { backendUrl } from "@/lib/utils";
import { UserPatch, UserProfile } from "@/lib/types";

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
