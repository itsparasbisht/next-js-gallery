import SearchQueryState from "../context/searchQuery/SearchQueryState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SearchQueryState>
      <Component {...pageProps} />
    </SearchQueryState>
  );
}

export default MyApp;
