import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import ListCard from '../components/ListCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [visitedBivacchi, setVisitedBivacchi] = useState([]);

  useEffect(() => {
    const fetchUserAndVisited = async () => {
      try {
        // Simulazione: utente loggato con id = 1
        const userRes = await fetch('http://localhost:3001/users/2');
        if (!userRes.ok) throw new Error("Errore caricamento utente");
        const userData = await userRes.json();
        setUser(userData);

        // Recupera tutti i bivacchi
        const bivacchiRes = await fetch('http://localhost:3001/bivacchi');
        if (!bivacchiRes.ok) throw new Error("Errore caricamento bivacchi");
        const allBivacchi = await bivacchiRes.json();

        // Filtra solo quelli visitati
        const visited = allBivacchi.filter(bivacco =>
          userData.visited.includes(Number(bivacco.id))
        );
        setVisitedBivacchi(visited);
      } catch (error) {
        console.error("Errore:", error.message);
      }
    };

    fetchUserAndVisited();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5}>
          {user && <UserCard user={user} />}
        </Col>
        <Col md={7}>
          <h4 className="mb-3">Bivacchi visitati</h4>
          <Row>
            {visitedBivacchi.length > 0 ? (
              visitedBivacchi.map((bivacco) => (
                <Col sm={12} key={bivacco.id} className="mb-3">
                  <ListCard
                    title={bivacco.title}
                    description={bivacco.description}
                  />
                </Col>
              ))
            ) : (
              <p>Nessun bivacco visitato ancora.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
