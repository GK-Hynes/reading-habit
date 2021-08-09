import React, { useState, useContext, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { BooksContext } from "../contexts/BooksContext";

export default function BookForm({ book, handleSave }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [completed, setCompleted] = useState(false);
  const { addBook, updateBook } = useContext(BooksContext);

  const { user } = useUser();

  useEffect(() => {
    if (book) {
      setAuthor(book.data.author);
      setTitle(book.data.title);
      setCompleted(book.data.completed);
      setDateCompleted(book.data.dateCompleted);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (book) {
      const newData = {
        author,
        title,
        completed,
        dateCompleted
      };
      const updatedBook = { ...book };
      updatedBook.data = { ...newData, userId: user.sub };
      updateBook(updatedBook);
      handleSave();
    } else {
      addBook(author, title, completed, dateCompleted);
    }

    setAuthor("");
    setTitle("");
    setCompleted(false);
    setDateCompleted("");
  };

  const handleToggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <form
      className="form my-8 border border-gray-200 rounded-lg px-4 py-4 shadow-lg"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold mb-2">
        {book ? "Edit Book" : "Add a Book"}
      </h3>
      <div className="flex flex-col text-sm mb-2">
        <label
          className="text-lg font-semibold mb-2 text-gray-800"
          htmlFor="author"
        >
          Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={author || ""}
          required
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="border border-gray-200 p-2 mb-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <label
          className="text-lg font-semibold mb-2 text-gray-800"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title || ""}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-200 p-2 mb-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={completed}
            className="mr-4 h-4 w-4 rounded border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-black"
            onChange={handleToggleCompleted}
          />
          <label
            className="text-lg font-semibold text-gray-800"
            htmlFor="completed"
          >
            Completed?
          </label>
        </div>
        {completed && (
          <>
            <label
              className="text-lg font-semibold mb-2 text-gray-800"
              htmlFor="dateCompleted"
            >
              Date Completed
            </label>
            <input
              type="date"
              name="dateCompleted"
              id="dateCompleted"
              value={dateCompleted || ""}
              onChange={(e) => setDateCompleted(e.target.value)}
              className="border border-gray-200 p-2 mb-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
            />
          </>
        )}
      </div>
      <button
        className="w-full rounded font-semibold bg-black text-white hover:bg-white hover:text-black border hover:border-black py-2 transition duration-300 ease-in-out"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
