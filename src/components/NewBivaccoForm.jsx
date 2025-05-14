import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { API_URL } from '../config';

const NewBivaccoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Rifugio',
    place: '',
    difficulty: '',
    duration: '',
    length: '',
    heightDifference: '',
    maxHeight: '',
    image: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBivacco = {
      ...formData,
      comments: []
    };

    try {
      const response = await fetch(`${API_URL}/bivacchi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBivacco)
      });

      if (response.ok) {
        setSuccessMessage('Bivacco creato con successo!');
        setErrorMessage('');
        setFormData({
          title: '',
          description: '',
          category: 'Rifugio',
          place: '',
          difficulty: '',
          duration: '',
          length: '',
          heightDifference: '',
          maxHeight: '',
          image: '',
        });
      } else {
        throw new Error('Errore nella creazione del bivacco');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container className="mt-5">
      <h3>Crea un nuovo Bivacco</h3>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        {[
          ['title', 'Titolo'],
          ['description', 'Descrizione'],
          ['place', 'Luogo'],
          ['difficulty', 'Difficoltà'],
          ['duration', 'Durata'],
          ['length', 'Lunghezza'],
          ['heightDifference', 'Dislivello'],
          ['maxHeight', 'Altitudine Massima'],
          ['image', 'URL Immagine']
        ].map(([field, label]) => (
          <Form.Group className="mb-3" controlId={field} key={field}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Form.Select name="category" value={formData.category} onChange={handleChange}>
            <option value="Rifugio">Rifugio</option>
            <option value="Bivacco">Bivacco</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">Crea Bivacco</Button>
      </Form>
    </Container>
  );
};

export default NewBivaccoForm;
