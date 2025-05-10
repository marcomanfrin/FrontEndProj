import { useEffect, useState } from "react"
import { PacmanLoader } from "react-spinners"
import { Alert } from "react-bootstrap"
import Product from "../components/Product"
import ProductsFilters from "../components/ProductsFilters"
import NewComponentForm from "../components/NewComponentForm"
import Navbar from "../layout/Navbar"
import { useSearchParams } from "react-router"

const Bivacchi = () => {
  const [isNewProduct, _] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProducts, setShowProducts] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Teniamo traccia tramite stato dello stato dei filtri di <ProductsFilters>
  // const [limit, setLimit] = useState(20)
  // const [category, setCategory] = useState("")
  // const [search, setSearch] = useState("")

  // Refactor con Search Parameters al posto dello state
  const [searchParams, setSearchParams] = useSearchParams()

  const limit = searchParams.get("limit") || 20
  const category = searchParams.get("category") || ""
  const search = searchParams.get("search") || ""

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:3001/products?limit=" + limit
      if (category) url += "&category=" + category
      if (search) url += "&title=" + search

      setLoading(true)
      const response = await fetch(url)
      const products = await response.json()
      if (!response.ok) throw new Error("HTTP ERROR!")
      setProducts(products)
    } catch (error) {
      console.log(error)
      setError("Errore durante il fetch dei prodotti")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [limit, category])

  const handleSelect = selected => {
    setSelectedProduct(selected)
  }

  if (isNewProduct) return <NewComponentForm />

  return (
    <>
      <ProductsFilters
        fetchProducts={fetchProducts}
        // setLimit={setLimit}
        // setCategory={setCategory}
        // setSearch={setSearch}
        setSearchParams={setSearchParams}
      />
      {loading && <PacmanLoader />}
      {error && <Alert>❌ Error: {error}</Alert>}
      {!error && (
        <button
          onClick={() => {
            setShowProducts(() => !showProducts)
          }}
        >
          SHOW PRODUCTS
        </button>
      )}

      {!error && showProducts && products.length > 0
        ? products.map(product => <Product key={product.id} {...product} selectedProduct={selectedProduct} handleSelect={handleSelect} />)
        : !error && <div>NO PRODUCTS FOUND</div>}
    </>
  )
}

export default Bivacchi
