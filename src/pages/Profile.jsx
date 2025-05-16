import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import UserCard from '../components/UserCard';
import ListCard from '../components/ListCard';

import { API_URL } from '../config';


const Profile = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const [visitedBivacchi, setVisitedBivacchi] = useState([]);
  const [savedBivacchi, setSavedBivacchi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetch = async () => {
      try {
        const res = await fetch(`${API_URL}/bivacchi`);
        if (!res.ok) throw new Error("Errore durante il recupero dei bivacchi");
        const allBivacchi = await res.json();

        const visited = allBivacchi.filter(bivacco =>
          user.visited?.includes(bivacco.id)
        );

        const saved = allBivacchi.filter(bivacco =>
          user.saved?.includes(bivacco.id)
        );

        setVisitedBivacchi(visited);
        setSavedBivacchi(saved);
      } catch (error) {
        console.error("Errore:", error);
      }
    };

    fetch();
  }, [user, navigate]);

  return (
    <Container fluid className="mt-5">
      <Row>
        {/* Colonna 1: Utente */}
        <Col md={4}>
          {user && <UserCard user={user} />}
        </Col>

        {/* Colonna 2: Bivacchi da visitare */}
        <Col md={4}>
          <h4 className="mb-3">Da visitare ({savedBivacchi.length})</h4>
          {savedBivacchi.length > 0 ? (
            savedBivacchi.map((bivacco) => (
              <ListCard key={bivacco.id} title={bivacco.title} data={bivacco.place} />
            ))
          ) : (
            <p>Nessun bivacco da visitare.</p>
          )}
        </Col>

        {/* Colonna 3: Bivacchi visitati */}
        <Col md={4}>
          <h4 className="mb-3">Visitati ({visitedBivacchi.length})</h4>
          {visitedBivacchi.length > 0 ? (
            visitedBivacchi.map((bivacco) => (
              <ListCard key={bivacco.id} title={bivacco.title} data={bivacco.place} />
            ))
          ) : (
            <p>Nessun bivacco ancora visitato.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;