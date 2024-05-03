import React, { useState } from "react";
import UseCustomData from "../../hooks/useCustomData";
import { FormErrors } from "../../constants/types";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    id: "", // Set default userId to the first user
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { users, posts, handleAddPost, load } = UseCustomData();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors related to the changed input field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { title, body, id } = formData;

    if (!title.trim() || !body.trim()) {
      setErrors({
        title: !title.trim() ? "Title is required" : "",
        body: !body.trim() ? "Body is required" : "",
      });
      return;
    }

    try {
      if (title !== "" && body !== "") {
        await handleAddPost({
          body: formData.body,
          title: formData.title,
          userId: 11,
          id: posts.length + 1,
        });
        setFormData({
          title: "",
          body: "",
          id: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: "300px" }}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <input
          type="text"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          style={{ width: "300px" }}
        />
        {errors.body && <p className="error">{errors.body}</p>}
      </div>
      <div>
        <label htmlFor="userId">Select User</label>
        <select
          id="userId"
          name="userId"
          value={formData.id}
          style={{ width: "300px" }}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        >
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{load ? "Loading...." : "Create Post"} </button>
    </form>
  );
};

export default PostForm;
