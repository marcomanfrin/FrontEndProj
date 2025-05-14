import { Link } from "react-router"
import './ComponentLayout.css';
import { Alert, Container, Row, Col } from "react-bootstrap";

function Bivacco({ id, title, image, stock, selectedProduct, handleSelect }) {

  const isSelected = id === (selectedProduct && selectedProduct.id)

  return (
    <div className={`product ${stock === 0 ? "out-of-stock" : ""} ${isSelected ? "selected" : ""}`} onClick={() => handleSelect({ id })}>
      <Container className="component-container mt-4">
        <img src={image} alt={title} className="" />
        <h2>{title}</h2>
        <button>Visitato</button>
        <button>
          <Link to={`/products/${id}`}>Dettagli bivacco</Link>
        </button>
      </Container>
    </div>
  )
}

export default Bivacco
