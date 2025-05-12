
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import ListCard from '../components/ListCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Simulated data fetch
    setUser({ firstName: "Mario", lastName: "Rossi", email: "mario.rossi@email.com" });

    setLists([
      { id: 1, title: "Elenco 1", description: "Descrizione elenco 1" },
      { id: 2, title: "Elenco 2", description: "Descrizione elenco 2" },
      { id: 3, title: "Elenco 3", description: "Descrizione elenco 3" },
    ]);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5}>
            {user && <UserCard user={user} />}
        </Col>
        <Col md={7}> 
            <Row>
            {lists.map(elenco => (
                <Col sm={12} md={12} lg={12} key={elenco.id} className="mb-3">
                <ListCard title={elenco.title} description={elenco.description} />
                </Col>
            ))}
            </Row>
        </Col>
        </Row>
    </Container>
  );
};

export default Profile;
