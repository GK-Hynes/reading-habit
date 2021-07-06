import React from "react";

export default function Navbar({ user }) {
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-4xl font-semibold text-gray-800">
        My Current Reading List
      </p>
      <div className="flex">
        {user && (
          <a
            href="/api/auth/logout"
            className="rounded font-semibold bg-black text-white hover:bg-white hover:text-black border hover:border-black py-2 px-4 transition duration-300 ease-in-out"
          >
            Logout
          </a>
        )}
        {!user && (
          <a
            href="/api/auth/login"
            className="rounded font-semibold bg-black text-white hover:bg-white hover:text-black border hover:border-black py-2 px-4 transition duration-300 ease-in-out"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
