import Head from "next/head";
import { getBookById } from "../../utils/Fauna";
import Navbar from "../../components/navbar";
import BookForm from "../../components/bookForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Edit({ book, user }) {
  return (
    <div>
      <Head>
        <title>Update Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar user={user} title="Build a Reading Habit" />
      <main className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Update Book</h1>
        <BookForm book={book} />
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const id = context.params.id;
      const book = await getBookById(id);
      return {
        props: { book }
      };
    } catch (error) {
      console.error(error);
      context.res.statusCode = 302;
      context.res.setHeader("Location", `/`);
      return { props: {} };
    }
  }
});
