import { useEffect, useState } from "react";
import styles from "./searchInput.module.css";

let debounceHandler = null;

function SearchInput() {
  const [search, setSearch] = useState();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    clearTimeout(debounceHandler);
    debounceHandler = setTimeout(() => {
      getSuggestions(search);
    }, 700);
  }, [search]);

  const getSuggestions = (search) => {
    fetch(`https://api.datamuse.com/sug?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const suggestionsArr = data;
        setSuggestions(suggestionsArr);
      });
  };

  return (
    <div className={styles.searchContainer}>
      <form>
        <input
          type="text"
          placeholder="search for images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <h3>Images from Unsplash</h3>
      </form>
    </div>
  );
}

export default SearchInput;
