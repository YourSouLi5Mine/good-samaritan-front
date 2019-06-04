import { ADD_POST } from "../Constants/action-types";

export function addPost(payload) {
  return { type: ADD_POST, payload }
};
