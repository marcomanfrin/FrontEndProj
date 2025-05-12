import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { Alert, Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import ProductsFilters from "../components/ProductsFilters";
import NewComponentForm from "../components/NewComponentForm";
import { useSearchParams } from "react-router";
import './ComponentLayout.css';

const Bivacchi = () => {
  const [isNewProduct, _] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProducts, setShowProducts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || 20;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const fetchProducts = async () => {
    try {
      let url = `http://localhost:3001/bivacchi?_limit=${limit}`;
      if (category) url += `&category=${category}`;
      if (search) url += `&q=${encodeURIComponent(search)}`;

      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error("HTTP ERROR!");
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError("Errore durante il fetch dei prodotti");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit, category, search]);

  const handleSelect = selected => setSelectedProduct(selected);

  if (isNewProduct) return <NewComponentForm />;

  return (
    <>
      <div className="my-4">
        <ProductsFilters fetchProducts={fetchProducts} setSearchParams={setSearchParams} />
      </div>

      {loading && (
        <div className="text-center my-4">
          <PacmanLoader />
        </div>
      )}

      {error && <Alert variant="danger" className="text-center">❌ {error}</Alert>}

      {!error && showProducts && products.length > 0 ? (
        <Container className="component-container mt-4">
          <Row>
            {products.map(product => (
              <Col key={product.id} md={6} lg={4} className="mb-4">
                <Product {...product} selectedProduct={selectedProduct} handleSelect={handleSelect} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : !loading && !error ? (
        <div className="text-center mt-4">NO PRODUCTS FOUND</div>
      ) : null}
    </>
  );
};

export default Bivacchi;
