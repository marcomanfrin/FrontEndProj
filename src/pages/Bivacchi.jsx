import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { Alert, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router";

import Bivacco from "../components/Bivacco";
import Filters from "../components/Filters";
import '../style/ComponentLayout.css'

import { API_URL } from '../config';

/**
 * Bivacchi component fetches and displays a list of bivacco items with filtering,
 * pagination, and selection capabilities.
 */
const Bivacchi = () => {
  // State for storing the list of bivacco items
  const [bivaccos, setBivaccos] = useState([]);
  // State for storing the currently selected bivacco
  const [selectedBivacco, setSelectedBivacco] = useState(null);
  // State to indicate loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);
  // State for the current page number in pagination
  const [page, setPage] = useState(1);
  // State for the total number of pages available
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 6;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  /**
   * Fetches bivacco data from the API based on current filters and pagination.
   */
  const fetchBivacchi = async () => {
    try {
      // Construct the API URL with query parameters for limit, page, category, and search
      let url = `${API_URL}/bivacchi?_limit=${limit}&_page=${page}`;
      if (category) url += `&category=${category}`;
      if (search) url += `&q=${encodeURIComponent(search)}`;

      setLoading(true);
      // Fetch data from the API
      const response = await fetch(url);
      const data = await response.json();
      // Throw error if response is not ok
      if (!response.ok) throw new Error("HTTP ERROR!");

      // Extract total count from headers to calculate total pages
      const totalCount = response.headers.get("X-Total-Count");
      setTotalPages(Math.ceil(totalCount / limit));
      // Update bivaccos state with fetched data
      setBivaccos(data);
    } catch (error) {
      console.error(error);
      // Set error message state
      setError("Errore durante il fetch dei prodotti");
    } finally {
      // Set loading to false after fetch completes or fails
      setLoading(false);
    }
  };

  /**
   * useEffect triggers fetchBivacchi whenever limit, category, search or page changes.
   */
  useEffect(() => {
    fetchBivacchi();
  }, [limit, category, search, page]);

  /**
   * Handles selection of a bivacco item.
   * @param {object} selected - The selected bivacco item.
   */
  const handleSelect = selected => setSelectedBivacco(selected);

  return (
    <>
      {/* Filters section */}
      <div className="my-4">
        <Filters fetchBivacchi={fetchBivacchi} setSearchParams={setSearchParams} />
      </div>

      {/* Loader section */}
      {loading && (
        <div className="text-center my-4">
          <PacmanLoader />
        </div>
      )}

      {/* Error message section */}
      {error && <Alert variant="danger" className="text-center">❌ {error}</Alert>}

      {/* Results and pagination section */}
      {!error && bivaccos.length > 0 && !loading ? (
        <>
          <Row>
            {bivaccos.map(bivacco => (
              <Col key={bivacco.id} md={6} lg={4} className="mb-4">
                <Bivacco {...bivacco} selectedBivacco={selectedBivacco} handleSelect={handleSelect} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center my-4">
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>
            <span className="align-self-center">Page {page} of {totalPages}</span>
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        </>
      ) : !loading && !error ? (
        <div className="text-center mt-4">NO BIVACCHI FOUND</div>
      ) : null}
    </>
  );
};

export default Bivacchi;