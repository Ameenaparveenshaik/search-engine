import { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import Suggestions from "./components/Suggestions";
import data from "./data.json";

const App = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState([]);

  const handleSearch = (term) => {
    const normalizedTerm = term.trim().toLowerCase();
    setSearchTerm(term);
    const filteredSuggestions = normalizedTerm
      ? data.filter(({ country, capital }) =>
          country.toLowerCase().startsWith(normalizedTerm) ||
          capital.toLowerCase().startsWith(normalizedTerm)
        )
      : [];
    setSuggestions(filteredSuggestions);
    setShowSuggestions(!!filteredSuggestions.length);
  };

  const handleSubmit = () => {
    setCountry(suggestions);
    setShowSuggestions(false);
  };

  const handleFocus = () => setShowSuggestions(true);
  const handleBlur = () => !searchTerm.trim() && setShowSuggestions(false);
  const handleSuggestionClick = (suggestion) => {
    setCountry([suggestion]);
    setShowSuggestions(false);
  };

  const renderCountryDetails = (country, index) => (
    <div className="card" key={index}>
      <h2>{country.country}</h2>
      <p><strong>Capital: </strong>{country.capital}</p>
      <p><strong>Population: </strong>{country.population.toLocaleString()}</p>
      <p><strong>Official Language: </strong>{country.official_language}</p>
      <p><strong>Currency: </strong>{country.currency}</p>
    </div>
  );

  return (
    <div className="google-search">
      <SearchForm
        onSearch={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
      {showSuggestions && searchTerm.trim().length > 0 ? (
        <Suggestions suggestions={suggestions} onClick={handleSuggestionClick} searchTerm={searchTerm} />
      ) : (
        country.map(renderCountryDetails)
      )}
    </div>
  );
};

export default App;
