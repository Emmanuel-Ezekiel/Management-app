import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import UseCustomData from "../../hooks/useCustomData";
import Loader from "../Loader/loader";
import { PostTypes, PageClickEvent } from "../../constants/types";


const PostTable = () => {
  const { posts, handleDeletePost, load, handleEditPost } = UseCustomData();
  const [editingPost, setEditingPost] = useState<null | PostTypes>(null);
  const [input, setInputs] = useState<{ body: string; title: string }>({
    body: "",
    title: "",
  });

  const [dataOffset, setDataOffset] = useState<number>(0);
  const datasPerPage = 10;

  // Pagination variables
  const endOffset = dataOffset + datasPerPage;
  const currentItems = posts?.slice(dataOffset, endOffset);
  const pageCount = Math.ceil(posts?.length / datasPerPage);

  const handleEdit = (post: PostTypes) => {
    // Set the post being edited
    setEditingPost(post);
  };
  
  const handleCancelEdit = () => {
    // Cancel editing and reset editingPost state
    setEditingPost(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      // Update input fields based on user input
    setInputs((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handlePageClick = (event: PageClickEvent) => {
     // Calculate new data offset based on pagination
    const newOffset = (event.selected * datasPerPage) % (posts?.length || 0);
    setDataOffset(newOffset);
  };
  

  const handleSaveEdit = () => {
    // PUT request to API endpoint to update post data
    if (editingPost !== null) {
        handleEditPost(
          {
            title: input.title,
            body: input.body,
            id: editingPost.id,
            userId: editingPost.userId,
          },
          editingPost.id
        );
         // Reset editing state and input fields
        setEditingPost(null);
        setInputs({
          body: "",
          title: "",
        });
      }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Body</th>
          <th>Title</th>
          <th>Id</th>
          <th>Actions</th>
        </tr>
      </thead>

      {load ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems?.map((post) => (
                <tr key={post.id}>
                  <td className="post-body">
                    {editingPost && editingPost.id === post.id ? (
                      <input
                        type="text"
                        name="body"
                        value={input.body}
                        onChange={handleChange}
                      />
                    ) : (
                      post.body
                    )}
                  </td>
                  <td className="post-body">
                    {editingPost && editingPost.id === post.id ? (
                      <input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={handleChange}
                      />
                    ) : (
                      post.title
                    )}
                  </td>
                  <td className="post-body">{post.id}</td>

                  <td
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    {editingPost && editingPost.id === post.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="btn btn-success"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(post)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePost(post?.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Users....</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <p>
              <span>
                {" "}
                {endOffset} / {posts?.length}
              </span>{" "}
              Total Per Page
            </p>

            <ReactPaginate
              breakLabel="..."
              nextLabel="&rarr;"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="&larr;"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </tfoot>
        </>
      )}
    </table>
  );
};

export default PostTable;
