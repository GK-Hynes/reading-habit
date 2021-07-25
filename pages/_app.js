import { UserProvider } from "@auth0/nextjs-auth0";
import { BooksProvider } from "../contexts/BooksContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <BooksProvider>
        <div className="container mx-auto px-8 my-10 max-w-6xl">
          <Component {...pageProps} />
        </div>
      </BooksProvider>
    </UserProvider>
  );
}

export default MyApp;
