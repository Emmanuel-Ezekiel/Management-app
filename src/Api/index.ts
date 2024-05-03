import { Api } from "../config/axios.config";
import { handleAxiosError } from "./handleApiError";
import { PostTypes } from "../constants/types";
import { showToast } from "../utils/helpers";
export const getUser = async () => {
  try {
    const user = await Api.get("/users");
    return user.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const createPost = async (payload: PostTypes) => {
  try {
    const posts = await Api.post("/posts", { ...payload });
    showToast("success", "post added");
    return posts.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updatePost = async (
  payload: PostTypes,
  id: number | undefined
) => {
  try {
    const posts = await Api.put(`/posts/${id}`, { ...payload });
    showToast("success", "update item");
    return posts.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getPosts = async () => {
  try {
    const posts = await Api.get("/posts");
    return posts.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deletePost = async (id: number | undefined) => {
  try {
    const posts = await Api.delete(`/posts/${id}`);
    showToast("success", "delete item");
    return posts.status;
  } catch (error) {
    return handleAxiosError(error);
  }
};
