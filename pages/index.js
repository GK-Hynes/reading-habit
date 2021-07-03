import { useEffect, useContext } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Book from "../components/book";
import { BooksContext } from "../contexts/BooksContext";
import { table, minifyRecords } from "./api/utils/airtable";

export default function Home({ initialBooks }) {
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
      <Navbar />
      <main>
        <ul>
          {books && books.map((book) => <Book key={book.id} book={book} />)}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const books = await table.select({}).firstPage();
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
