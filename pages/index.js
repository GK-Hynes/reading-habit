import { useEffect, useContext } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Book from "../components/book";
import BookForm from "../components/bookForm";
import { BooksContext } from "../contexts/BooksContext";
import { table, minifyRecords } from "./api/utils/airtable";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default function Home({ initialBooks, user }) {
  const { books, setBooks } = useContext(BooksContext);
  useEffect(() => {
    setBooks(initialBooks);
  }, []);
  return (
    <div>
      <Head>
        <title>Build a Reading Habit</title>
        <meta name="description" content="Build a reading habit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>
        {user && (
          <>
            <BookForm />
            <ul>
              {books && books.map((book) => <Book key={book.id} book={book} />)}
            </ul>
          </>
        )}
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
        books = await table
          .select({
            filterByFormula: `userId = '${user.sub}'`
          })
          .firstPage();
      }
      return {
        props: {
          initialBooks: minifyRecords(books)
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
