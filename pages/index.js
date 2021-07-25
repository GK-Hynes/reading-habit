import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/navbar";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <Head>
        <title>Build a Reading Habit</title>
        <meta name="description" content="Build a reading habit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} title="Build a Reading Habit" />
      <main>
        {user && (
          <div>
            <Link href="/myBooks">
              <a className="block text-center my-6 rounded font-semibold bg-black text-white hover:bg-white hover:text-black border hover:border-black py-2 px-4 transition duration-300 ease-in-out">
                View your Current Reading List
              </a>
            </Link>
          </div>
        )}
        {!user && (
          <p className="text-center my-6 text-xl">
            Log in to view and update your reading list
          </p>
        )}
      </main>
    </div>
  );
}
