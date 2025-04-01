function Search({
  searchQuery,
  search,
}: {
  searchQuery: string;
  search: (query: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        className="form-control search"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => search(e.target.value)}
      />
      {searchQuery && (
        <i className="bi bi-x clear-search" onClick={() => search("")}></i>
      )}
    </>
  );
}

export default Search;
