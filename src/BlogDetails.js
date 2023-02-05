import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch("http://localhost:1337/blogs/" + id);

  const handleDelete = () => {
    fetch("http://localhost:1337/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="blog-details">
      {isLoading && <div>Loading ...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2> {blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
}
