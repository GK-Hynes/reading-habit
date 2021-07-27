import { useEffect, useContext } from "react";
import Head from "next/head";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Navbar from "../components/navbar";
import Book from "../components/book";
import BookForm from "../components/bookForm";
import { BooksContext } from "../contexts/BooksContext";
import { getBooksByUser } from "../utils/Fauna";

export default function MyBooks({ initialBooks, user }) {
  const { books, setBooks } = useContext(BooksContext);
  useEffect(() => {
    setBooks(initialBooks);
  }, []);
  console.log(books);
  return (
    <div>
      <Head>
        <title>Your Books | Reading Habit</title>
        <meta name="description" content="Build a reading habit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} title="Your Current Reading List" />
      <main className="max-w-xl mx-auto">
        {user && (
          <>
            <BookForm />
            <ul>
              {books && books.map((book) => <Book key={book.id} book={book} />)}
            </ul>
          </>
        )}
        {!user && <p>Log in to save your reading list</p>}
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { user } = getSession(context.req);
    let books = [];

    try {
      if (user) {
        books = await getBooksByUser(user.sub);
      }
      return {
        props: {
          initialBooks: books
        }
      };
    } catch (err) {
      console.error(err);
      return {
        props: {
          err: "Something went wrong"
        }
      };
    }
  }
});
