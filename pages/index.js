import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/navbar";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <Head>
        <title>Reading Habit</title>
        <meta name="description" content="Build a reading habit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} title="Build a Reading Habit" />
      <main>
        {user && (
          <>
            <div className="text-center py-8 max-w-xl mx-auto">
              <h2 className="text-3xl font-semibold mb-2">
                Hi {user?.nickname || "there"}! 👋
              </h2>
              <Link href="/myBooks">
                <a className="block text-center my-6 rounded font-semibold bg-black text-white hover:bg-white hover:text-black border hover:border-black py-2 px-4 transition duration-300 ease-in-out">
                  View your Current Reading List
                </a>
              </Link>
            </div>
          </>
        )}
        {!user && (
          <div className="py-8 max-w-xl mx-auto">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-center my-3 text-xl">
              Log in to view and update your reading list
            </p>
            <a
              href="/myBooks"
              className="block text-center rounded font-semibold bg-black text-white hover:bg-white hover:text-black border hover:border-black py-2 px-4 transition duration-300 ease-in-out"
            >
              Login
            </a>
          </div>
        )}
        <section className="py-16 w-full flex justify-evenly gap-8 flex-col lg:flex-row">
          <div className="bg-gray-100 p-4 mb-16 mx-auto w-full max-w-md flex-1 rounded">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 bg-black p-2 rounded -mt-9 mb-4 shadow-md"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              All your books in one place
            </h3>
            <p className="text-center mb-4 px-2">
              Keep track of your to-read pile
            </p>
            <p className="text-center mb-4 px-2">
              Don't rely on battered notebooks
            </p>
          </div>
          <div className="bg-gray-100 p-4 mb-16 mx-auto w-full max-w-md flex-1 rounded">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 bg-black p-2 rounded -mt-9 mb-4 shadow-md"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Saved to the cloud
            </h3>
            <p className="text-center mb-4 px-2">
              What happens if you lose your reading list, or don't have it with
              you?
            </p>
            <p className="text-center mb-4 px-2">
              Never lose track of another book again.
            </p>
          </div>
          <div className="bg-gray-100 p-4 mb-16 mx-auto w-full max-w-md flex-1 rounded">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 bg-black p-2 rounded -mt-9 mb-4 shadow-md"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Organized and accessible
            </h3>
            <p className="text-center mb-4 px-2">
              A record of all of your books - read, unread and up next.
            </p>
            <p className="text-center mb-4 px-2">Available wherever you are.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
