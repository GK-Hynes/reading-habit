import { BooksProvider } from "../contexts/BooksContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <BooksProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <Component {...pageProps} />
      </div>
    </BooksProvider>
  );
}

export default MyApp;
