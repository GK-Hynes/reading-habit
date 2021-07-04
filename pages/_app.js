import { UserProvider } from "@auth0/nextjs-auth0";
import { BooksProvider } from "../contexts/BooksContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <BooksProvider>
        <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
        </div>
      </BooksProvider>
    </UserProvider>
  );
}

export default MyApp;
