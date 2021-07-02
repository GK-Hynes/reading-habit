import Head from "next/head";
import Navbar from "../components/navbar";
import { table, minifyRecords } from "./api/utils/airtable";

export default function Home({ initialBooks }) {
  console.log(initialBooks);
  return (
    <div>
      <Head>
        <title>Build a Reading Habit</title>
        <meta name="description" content="Build a reading habit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Reading Habit</h1>
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
