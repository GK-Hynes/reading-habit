import Head from "next/head";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Build a reading habit</title>
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
