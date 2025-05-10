const ProductsFilters = ({ fetchProducts, setSearchParams }) => {
  return (
    <div>
      <label htmlFor="limit-select">Products per page:</label>
      <select
        id="limit-select"
        onChange={event => {
          // setSearchParams({ limit: event.target.value }) // Se passo un oggetto e basta, sto sovrascrivendo i query parameters pre-esistenti
          // Se passo una callback function invece posso accedere ai query params
          // attuali ed aggiungere il nuovo, facendo così una concatenazione invece che una sovrascrittura
          setSearchParams(actualParams => {
            actualParams.set("limit", event.target.value)
            return actualParams
          })
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        onChange={event => {
          setSearchParams(actualParams => {
            actualParams.set("category", event.target.value)
            return actualParams
          })
        }}
      >
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="electronics">Electronics</option>
      </select>
      <label htmlFor="search-input">Search: </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search Products"
        onChange={event => {
          setSearchParams(actualParams => {
            actualParams.set("search", event.target.value)
            return actualParams
          })
        }}
      ></input>
      <button onClick={fetchProducts}>🔎 Search</button>
    </div>
  )
}

export default ProductsFilters
