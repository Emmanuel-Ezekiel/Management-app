import { Api } from "../config/axios.config";
import { handleAxiosError } from "./handleApiError";
import { PostTypes } from "../constants/types";
import { showToast } from "../utils/helpers";


/**
 * Fetches user data from the API.
 * @returns Promise<UserTypes> A promise that resolves to user data.
 */
export const getUser = async () => {
    try {
      const user = await Api.get("/users");
      return user.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  };


  
  /**
   * Creates a new post.
   * @param payload The post data to be created.
   * @returns Promise<PostTypes> A promise that resolves to the created post data.
   */
  export const createPost = async (payload: PostTypes) => {
    try {
      const posts = await Api.post("/posts", { ...payload });
      showToast("success", "post added");
      return posts.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  };


  
  /**
   * Updates an existing post.
   * @param payload The updated post data.
   * @param id The ID of the post to be updated.
   * @returns Promise<PostTypes> A promise that resolves to the updated post data.
   */
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

  
  /**
   * Fetches all posts from the API.
   * @returns Promise<PostTypes[]> A promise that resolves to an array of posts.
   */
  export const getPosts = async () => {
    try {
      const posts = await Api.get("/posts");
      return posts.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  
  
  /**
   * Deletes a post with the specified ID.
   * @param id The ID of the post to be deleted.
   * @returns Promise<number> A promise that resolves to the HTTP status code indicating success or failure.
   */
  export const deletePost = async (id: number | undefined) => {
    try {
      const posts = await Api.delete(`/posts/${id}`);
      showToast("success", "delete item");
      return posts.status;
    } catch (error) {
      return handleAxiosError(error);
    }
  };
  
