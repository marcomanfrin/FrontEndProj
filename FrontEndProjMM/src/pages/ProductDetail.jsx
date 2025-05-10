import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router"

const ProductDetail = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("http://localhost:3001/products/" + productId)
        const product = await response.json()
        setProduct(product)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [productId])

  if (loading) return <div>Loading product...</div>

  if (error)
    return (
      <div>
        <h2>{error}</h2>
      </div>
    )

  const { title, image, description, stock } = product

  return (
    <div className={`product ${stock === 0 ? "out-of-stock" : ""}`}>
      <img src={image} alt={title} className="" />
      <h2>{title}</h2>
      <p>{description || "No Description"}</p>

      <button>Aggiungi al carrello</button>
      <button onClick={() => navigate(-1)}>Torna ai prodotti</button>
    </div>
  )
}

export default ProductDetail
