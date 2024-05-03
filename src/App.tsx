import UserTable from "./components/tables/userTable/userTable";
import PostTable from "./components/tables/posttable/PostTable";
import "./App.css";
import PostForm from "./components/forms/postForm";
import { useState } from "react";

function App() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      <div className="container">
        <h1>React CRUD App</h1>

        {openForm ? (
          <PostForm />
        ) : (
          <button className="btn btn-success" onClick={() => handleForm()}>
            Add Post +
          </button>
        )}

        <div className="flex-colum">
          <div className="flex-large">
            <h2>Post Datas</h2>
            <PostTable />

            <h2> Users Datas</h2>
            <UserTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
