import { useContext, useEffect, useState } from "react";
import searchQueryContext from "../context/searchQuery/SearchQueryContext";
import styles from "./searchInput.module.css";

let debounceHandler = null;

function SearchInput() {
  const [search, setSearch] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const [queryState, dispatch] = useContext(searchQueryContext);
  console.log(queryState);

  useEffect(() => {
    setSuggestions([]);
    if (suggestions?.length === 0) {
      clearTimeout(debounceHandler);
      setSuggestions([]);
    }
    if (search?.length > 0) {
      clearTimeout(debounceHandler);
      debounceHandler = setTimeout(() => {
        getSuggestions(search);
      }, 700);
    }
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
        <div className={styles.suggestionsContainer}>
          {suggestions.length > 0 &&
            suggestions.map((item, i) => (
              <h6
                key={i}
                onClick={(e) => {
                  setQuery(item.word);
                  dispatch({ type: "FIND-THIS", query: item.word });
                }}
              >
                {item.word}
              </h6>
            ))}
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
