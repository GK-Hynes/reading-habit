import React, { useState, useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export default function BookForm() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const { addBook } = useContext(BooksContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(author, title);
    setAuthor("");
    setTitle("");
  };
  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-2">Add a Book</h3>
      <div className="flex flex-col text-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="author">
          Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={author || ""}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="border border-gray-200 p-2 mb-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <label className="font-bold mb-2 text-gray-800" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-200 p-2 mb-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
      </div>
      <button
        className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
