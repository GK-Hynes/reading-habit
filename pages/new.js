import React from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/navbar";
import BookForm from "../components/bookForm";

export default function New() {
  const { user } = useUser();
  return (
    <div>
      <Head>
        <title>Add New Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} title="Build a Reading Habit" />
      <main className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">New Book</h1>
        <BookForm />
      </main>
    </div>
  );
}
