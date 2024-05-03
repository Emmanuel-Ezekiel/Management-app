import  { useEffect, useState } from "react";
import { UserTypes, PostTypes } from "../constants/types";
import { getUser, getPosts, deletePost, updatePost, createPost } from "../Api";

const UseCustomData = () => {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [load, setLoad] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getUser();
      if (response) setUsers(response);

      const postData = await getPosts();
      if (postData) setPosts(postData);
    };

    fetchData();
  }, []);

    // Function for deleting new post
  const handleDeletePost = async (id: number | undefined) => {
    setLoad(true);
    const response = await deletePost(id);
    if (response === 200) {
      setPosts(posts.filter((user) => user.id !== id));
      setLoad(false);
    }
  };

    // Function for Editing new post
  const handleEditPost = async (post: PostTypes, id: number | undefined) => {
    setLoad(true);
    const index = posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[index] = post;
      setPosts(updatedPosts);

      const response = await updatePost(post, id);
      if (response) {
        setLoad(false);
      }
    }
  };

  // Function for adding new post
  const handleAddPost = async (post: PostTypes) => {
    setLoad(true);
    const response = await createPost({
      ...post,
    });
    if (response) {
      setPosts((prevPosts) => [...prevPosts, post]);
      setLoad(false);
    }
  };

  return {
    users,
    setUsers,
    posts,
    setPosts,
    handleDeletePost,
    load,
    setLoad,
    handleEditPost,
    handleAddPost,
  };
};

export default UseCustomData;
