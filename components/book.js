import React, { useContext } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { BooksContext } from "../contexts/BooksContext";
import { format } from "date-fns";

export default function Book({ book }) {
  const { updateBook, deleteBook } = useContext(BooksContext);

  const { user } = useUser();

  let bookDate = "";
  if (book.data.dateCompleted) {
    bookDate = format(new Date(book.data.dateCompleted), "dd/MM/yyyy");
  }

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-4 py-4 px-4">
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
        {book.data.completed && <p>{`Completed: ${bookDate}`}</p>}
      </div>
      {user && user.sub == book.data.userId && (
        <Link href={`/edit/${book.id}`}>
          <a className="text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-600 hover:text-white py-1 px-2 rounded transition duration-300 ease-in-out mr-2">
            Edit
          </a>
        </Link>
      )}
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
