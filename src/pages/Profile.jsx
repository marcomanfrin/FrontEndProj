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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserAndVisited = async () => {
      try {
        const res = await fetch(`${API_URL}/bivacchi`);
        if (!res.ok) throw new Error("Errore durante il recupero dei bivacchi");
        const allBivacchi = await res.json();

        const visited = allBivacchi.filter(bivacco =>
          user.visited.includes(bivacco.id)
        );

        setVisitedBivacchi(visited);
      } catch (error) {
        console.error("Errore:", error);
      }
    };

    fetchUserAndVisited();
  }, [user, navigate]);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5}>
          {user && <UserCard user={user} />}
        </Col>
        <Col md={7}>
          <h3 className="mb-3">Bivacchi visitati ({visitedBivacchi.length})</h3>
          <Row>
            {visitedBivacchi.length > 0 ? (
              visitedBivacchi.map((bivacco) => (
                <Col sm={12} key={bivacco.id} className="mb-3">
                  <ListCard title={bivacco.title} data={bivacco.place}/>
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
