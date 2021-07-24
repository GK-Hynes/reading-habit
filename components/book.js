import React, { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export default function Book({ book }) {
  const { updateBook, deleteBook } = useContext(BooksContext);

  const handleToggleCompleted = () => {
    const updatedData = {
      ...book.data,
      completed: !book.data.completed
    };
    const updatedBook = { id: book.id, data: updatedData };
    updateBook(updatedBook);
  };
  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={book.data.completed}
        className="mr-4 h-4 w-4 rounded border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-black"
        onChange={handleToggleCompleted}
      />
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            book.data.completed ? "line-through" : ""
          }`}
        >
          {book.data.title}
        </h3>
        <p
          className={`text-gray-800 ${
            book.data.completed ? "line-through" : ""
          }`}
        >
          {book.data.author}
        </p>
      </div>
      <button
        type="button"
        className="text-sm font-semibold bg-red-100 text-red-500 hover:bg-red-600 hover:text-white py-1 px-2 ml-2 rounded transition duration-300 ease-in-out"
        onClick={() => deleteBook(book.id)}
      >
        Delete
      </button>
    </li>
  );
}
