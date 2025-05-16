import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { Alert, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router";

import Bivacco from "../components/Bivacco";
import Filters from "../components/Filters";
import '../../style/ComponentLayout.css'

import { API_URL } from '../config';

const Bivacchi = () => {
  const [bivaccos, setBivaccos] = useState([]);
  const [selectedBivacco, setSelectedBivacco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 6;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const fetchBivacchi = async () => {
    try {
      let url = `${API_URL}/bivacchi?_limit=${limit}&_page=${page}`;
      if (category) url += `&category=${category}`;
      if (search) url += `&q=${encodeURIComponent(search)}`;

      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error("HTTP ERROR!");

      const totalCount = response.headers.get("X-Total-Count");
      setTotalPages(Math.ceil(totalCount / limit));
      setBivaccos(data);
    } catch (error) {
      console.error(error);
      setError("Errore durante il fetch dei prodotti");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBivacchi();
  }, [limit, category, search, page]);

  const handleSelect = selected => setSelectedBivacco(selected);

  return (
    <>
      <div className="my-4">
        <Filters fetchBivacchi={fetchBivacchi} setSearchParams={setSearchParams} />
      </div>

      {loading && (
        <div className="text-center my-4">
          <PacmanLoader />
        </div>
      )}

      {error && <Alert variant="danger" className="text-center">❌ {error}</Alert>}

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