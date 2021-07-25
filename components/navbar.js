import React from "react";

export default function Navbar({ user, title }) {
  return (
    <nav className="flex justify-between items-center py-4 max-w-xl lg:max-w-full mx-auto">
      <h1 className="text-4xl font-semibold text-gray-800 mr-4">{title}</h1>
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
