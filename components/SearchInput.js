import styles from "./searchInput.module.css";

function SearchInput() {
  return (
    <div className={styles.searchContainer}>
      <form>
        <input type="text" placeholder="search for images..." />
        <h3>Images from Unsplash</h3>
      </form>
    </div>
  );
}

export default SearchInput;
