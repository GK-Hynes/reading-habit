import React from "react";
import Book from "./book";

export default function BookList({ books }) {
  const completedBooks = books.filter((book) => book.data.completed);
  const toReadBooks = books.filter((book) => !book.data.completed);

  completedBooks.sort((a, b) => {
    return new Date(b.data.dateCompleted) - new Date(a.data.dateCompleted);
  });

  return (
    <>
      <h3 className="text-xl font-semibold my-4">To Read</h3>
      <ul className="block mb-8">
        {toReadBooks &&
          toReadBooks.map((book) => <Book key={book.id} book={book} />)}
      </ul>
      <h3 className="text-xl font-semibold my-4">Completed</h3>
      <ul className="block mb-8">
        {completedBooks &&
          completedBooks.map((book) => <Book key={book.id} book={book} />)}
      </ul>
    </>
  );
}
