import React from "react";

export default function Book({ book }) {
  return (
    <li class="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={book.fields.completed}
        className="mr-2 form-checkbox h-5 w-5"
      />
      <p
        className={`flex-1 text-gray-800 ${
          book.fields.completed ? "line-through" : ""
        }`}
      >
        {book.fields.author} - {book.fields.title}
      </p>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
      >
        Delete
      </button>
    </li>
  );
}
