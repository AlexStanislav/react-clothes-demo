import "../assets/css/components/Search.css";
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  suggestions: string[];
}

function Search({ onSearch, suggestions }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    if (query === "") setSuggestedProducts([]);
    else {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedProducts(filteredSuggestions);
    }

    setSearchQuery(query);
    onSearch(query);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setSuggestedProducts([]);
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <span className="search__icon">
          <i className="pi pi-search"></i>
        </span>
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              selectSuggestion(searchQuery);
            }
          }}
          value={searchQuery}
          role="searchbox"
        />
        <i
          className="pi pi-times search__clear"
          style={{ display: searchQuery !== "" ? "block" : "none" }}
          onClick={() => handleSearch("")}
        ></i>
      </div>
      <div
        className="search__autocomplete"
        style={{ display: suggestedProducts.length > 0 ? "flex" : "none" }}
      >
        {suggestedProducts.map((suggestion, index) => (
          <div
            className="search__suggestion"
            key={index}
            onClick={() => selectSuggestion(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
