import { useState } from "react";

const Filters = ({ setSearchParams }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <label htmlFor="limit-select">Bivacchi per pagina:</label>
      <select 
        id="limit-select"
        onChange={event => {
          setSearchParams(actualParams => {
            actualParams.set("limit", event.target.value);
            return actualParams;
          });
        }}
      >
        <option value="">-</option>
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
      </select>

      <label htmlFor="category-select">Categoria:</label>
      <select
        id="category-select"
        onChange={event => {
          setSearchParams(actualParams => {
            actualParams.set("category", event.target.value);
            return actualParams;
          });
        }}
      >
        <option value="">-</option>
        <option value="Bivacco">Bivacco</option>
        <option value="Rifugio">Rifugio</option>
      </select>

      <label htmlFor="search-input">Ricerca: </label>
      <input
        id="search-input"
        type="text"
        placeholder="cerca un bivacco"
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
      />

      <button
        onClick={() => {
          setSearchParams(actualParams => {
            if (searchInput) {
              actualParams.set("search", searchInput);
            } else {
              actualParams.delete("search"); // remove param if input is empty
            }
            return actualParams;
          });
        }}
      >
        🔎
      </button>
    </div>
  );
};

export default Filters;