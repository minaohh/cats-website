import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Container, Row, Card, Col } from 'react-bootstrap';

import { catsApi } from './api/catsApi';

const PAGE_LIMIT = 10;

function App() {
  const [catBreeds, setCatBreeds] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [cats, setCats] = useState([]);
  const [catsPage, setCatsPage] = useState(0);

  const getBreedsAsync = async () => {
    try {
      const response = await catsApi.get('/breeds');

      setCatBreeds(response.data);
    } catch (err) {}
  };

  const handleCatBreed = (e) => {
    setSelectedBreed(e.target.value);
    console.log('Selected Breed', selectedBreed);

    setCats([]);
    setCatsPage(0);
    console.log('cats', cats);
    // console.log('Selected Breed', e.target.value);

    loadCats();
  };

  const loadCats = () => {
    loadCatsAsync(catsPage);
    setCatsPage(catsPage + 1);
  };

  const handleLoadClick = () => {
    loadCats();
  };

  const loadCatsAsync = async (pageNum) => {
    const response = await catsApi.get(
      `/images/search?breed_ids=${selectedBreed}&limit=${PAGE_LIMIT}&page=${pageNum}`
    );

    setCats([...response.data]);
    console.log('selected breed cats', response.data);
  };

  useEffect(() => {
    getBreedsAsync();
  }, []);

  return (
    <Container>
      <h1>Cat Browser</h1>
      <Row>
        <p>Breeds</p>
      </Row>
      <Row>
        {catBreeds && (
          <select
            value={selectedBreed}
            onChange={handleCatBreed}
            className="form-control"
          >
            <option key="none" value>
              Select Breed
            </option>
            {catBreeds.map((val, idx) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
        )}
      </Row>
      <Row>
        {!cats || cats.length === 0 ? (
          <p>No cats available</p>
        ) : (
          <>
            {cats.map((cat, idx) => (
              <Col md="3" sm="6" key={cat.id}>
                <Card key={cat.id}>
                  <Card.Img
                    variant="top"
                    src={cat.url}
                    rounded="true"
                    style={{ maxWidth: '18rem' }}
                  />
                  <Card.Body>
                    <Button variant="primary" block size="lg">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
      <Row>
        <Button
          variant="success"
          disabled={!cats || cats.length === 0 || cats.length < PAGE_LIMIT}
          onClick={handleLoadClick}
        >
          Load more
        </Button>
      </Row>
    </Container>
  );
}

export default App;
