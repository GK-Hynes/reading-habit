import { createContext, useState } from "react";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const refreshBooks = async () => {
    try {
      const res = await fetch("/api/getBooks");
      const latestBooks = await res.json();
      setBooks(latestBooks);
    } catch (err) {
      console.error(err);
    }
  };

  const addBook = async (author, title) => {
    try {
      const res = await fetch("/api/createBook", {
        method: "POST",
        body: JSON.stringify({ author, title }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newBook = await res.json();
      setBooks((prevBooks) => {
        return [newBook, ...prevBooks];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const res = await fetch("/api/updateBook", {
        method: "PUT",
        body: JSON.stringify(updatedBook),
        headers: {
          "Content-Type": "application/json"
        }
      });
      await res.json();
      setBooks((prevBooks) => {
        const existingBooks = [...prevBooks];
        const existingBook = existingBooks.find(
          (book) => book.id === updatedBook.id
        );
        existingBook.fields = updatedBook.fields;
        return existingBooks;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch("/api/deleteBook", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" }
      });
      setBooks((prevBooks) => {
        return prevBooks.filter((book) => book.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        refreshBooks,
        updateBook,
        deleteBook,
        addBook
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
