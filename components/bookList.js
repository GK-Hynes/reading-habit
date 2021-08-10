import React from "react";
import Book from "./book";
import { isMultiple } from "../utils/utils";

export default function BookList({ books }) {
  // Handle empty state
  if (!books || books.length === 0) {
    return (
      <div className="py-8">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 p-4 rounded-full stroke-current text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">No books yet</h3>
        <p className="text-center">Add a book to your list to get started</p>
      </div>
    );
  } else {
    // Filter, sort and render books
    const completedBooks = books.filter((book) => book.data.completed);
    const toReadBooks = books.filter((book) => !book.data.completed);

    completedBooks.sort((a, b) => {
      return new Date(b.data.dateCompleted) - new Date(a.data.dateCompleted);
    });

    return (
      <>
        <h3 className="text-xl font-semibold my-4">
          To Read - {toReadBooks.length} Book{isMultiple(toReadBooks.length)}
        </h3>
        <ul className="block mb-8">
          {toReadBooks &&
            toReadBooks.map((book) => <Book key={book.id} book={book} />)}
        </ul>
        <h3 className="text-xl font-semibold my-4">
          Completed - {completedBooks.length} Book
          {isMultiple(completedBooks.length)}
        </h3>
        <ul className="block mb-8">
          {completedBooks &&
            completedBooks.map((book) => <Book key={book.id} book={book} />)}
        </ul>
      </>
    );
  }
}
