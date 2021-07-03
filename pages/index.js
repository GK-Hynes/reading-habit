import Head from "next/head";
import Navbar from "../components/navbar";
import Book from "../components/book";
import { table, minifyRecords } from "./api/utils/airtable";

export default function Home({ initialBooks }) {
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
          
        </ul>
        {initialBooks.map((book) => (
          <Book key={book.id} book={book} />
        ))}
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
