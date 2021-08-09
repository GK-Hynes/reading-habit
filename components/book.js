import React, { useContext, useState } from "react";
import Link from "next/link";
import BookForm from "./bookForm";
import { useUser } from "@auth0/nextjs-auth0";
import { BooksContext } from "../contexts/BooksContext";
import { format } from "date-fns";

export default function Book({ book }) {
  const { deleteBook } = useContext(BooksContext);

  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);

  let bookDate = "";
  if (book.data.dateCompleted) {
    bookDate = format(new Date(book.data.dateCompleted), "dd/MM/yyyy");
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li>
        <BookForm book={book} handleSave={handleSave} />
      </li>
    );
  } else {
    return (
      <li className="bg-white flex flex-col md:flex-row items-center shadow-lg rounded-lg my-4 py-4 px-4">
        <div className="flex-1 py-4">
          <h3
            className={`text-center md:text-left text-lg font-semibold ${
              book.data.completed ? "line-through" : ""
            }`}
          >
            {book.data.title}
          </h3>
          <p
            className={`text-center md:text-left text-gray-800 ${
              book.data.completed ? "line-through" : ""
            }`}
          >
            {book.data.author}
          </p>
        </div>
        <div className="flex-1 flex items-center">
          {book.data.completed && (
            <p className="mr-4">{`Completed ${bookDate}`}</p>
          )}
          {user && user.sub == book.data.userId && (
            // <Link href={`/edit/${book.id}`}>
            //   <a className="ml-auto text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-600 hover:text-white py-1 px-2 rounded transition duration-300 ease-in-out mr-2">
            //     Edit
            //   </a>
            // </Link>
            <button
              onClick={setIsEditing}
              className="ml-auto text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-600 hover:text-white py-1 px-2 rounded transition duration-300 ease-in-out mr-2"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            className="text-sm font-semibold bg-red-100 text-red-500 hover:bg-red-600 hover:text-white py-1 px-2 ml-2 rounded transition duration-300 ease-in-out"
            onClick={() => deleteBook(book.id)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
