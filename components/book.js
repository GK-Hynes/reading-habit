import React, { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export default function Book({ book }) {
  const { updateBook, deleteBook } = useContext(BooksContext);

  const handleToggleCompleted = () => {
    const updatedFields = {
      ...book.fields,
      completed: !book.fields.completed
    };
    const updatedBook = { id: book.id, fields: updatedFields };
    updateBook(updatedBook);
  };
  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={book.fields.completed}
        className="mr-4 form-checkbox h-5 w-5"
        onChange={handleToggleCompleted}
      />
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            book.fields.completed ? "line-through" : ""
          }`}
        >
          {book.fields.title}
        </h3>
        <p
          className={`text-gray-800 ${
            book.fields.completed ? "line-through" : ""
          }`}
        >
          {book.fields.author}
        </p>
      </div>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteBook(book.id)}
      >
        Delete
      </button>
    </li>
  );
}
