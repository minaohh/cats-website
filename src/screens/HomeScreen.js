import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { catsApi } from '../api/catsApi';
import BreedContext from '../context/BreedContext';
import { ErrorAlert } from '../components/ErrorAlert';

const PAGE_LIMIT = 10;

const HomeScreen = () => {
  const [breedContext, setBreedContext] = useContext(BreedContext);
  const history = useHistory();

  const [catBreeds, setCatBreeds] = useState(null);
  const [cats, setCats] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [catsFetchCount, setCatsFetchCount] = useState(1);
  const [hasError, setHasError] = useState(false);

  //----------------
  // Handlers
  //----------------
  const handleCatBreedChanged = (e) => {
    setBreedContext({ ...breedContext, breed: e.target.value });
    initializeState();
  };

  const handleLoadClick = () => {
    loadCats();
  };

  const handleDetailsClick = (e, cat) => {
    setBreedContext({ ...breedContext, cat: { ...cat } });
    console.log('breedContext', breedContext);
    history.push(`/${cat.id}`);
  };

  //----------------
  // Async Methods
  //----------------
  const getBreedsAsync = async () => {
    try {
      setHasError(false);

      const response = await catsApi.get('/breeds');
      setCatBreeds([...response.data]);
    } catch (err) {
      setHasError(true);
    }
  };

  const loadCatsAsync = async (pageNum) => {
    try {
      setIsLoadingCats(true);
      setHasError(false);

      let query = `/images/search?breed_id=${breedContext.breed}&limit=${PAGE_LIMIT}&page=${pageNum}`;
      const response = await catsApi.get(query);

      setCats([...cats, ...response.data]);
      setCatsFetchCount(response.data.length);
      console.log('selected breed cats', response);
      console.log('cats', cats);
    } catch (err) {
      setHasError(true);
    }
    setIsLoadingCats(false);
  };

  //----------------
  // Lifecycle Methods
  //----------------
  useEffect(() => {
    if (breedContext.breed !== '') {
      loadCats();
    }
  }, [breedContext.breed]);

  useEffect(() => {
    getBreedsAsync();
  }, []);

  //----------------
  // Helper Methods
  //----------------
  const loadCats = () => {
    loadCatsAsync(pageNum);
    setPageNum(pageNum + 1);
  };

  const showError = (show) => {
    setHasError(show);
  };

  const initializeState = () => {
    setCats([]);
    setPageNum(1);
    setCatsFetchCount(0);
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h1>Cat 🐈 Browser</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Breeds</p>{' '}
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <select
            value={breedContext.breed}
            onChange={handleCatBreedChanged}
            className="form-control"
          >
            <option key="none" value>
              Select Breed
            </option>
            {catBreeds &&
              catBreeds.map((val, idx) => (
                <option key={idx} value={val.id}>
                  {val.name}
                </option>
              ))}
          </select>
        </Col>
      </Row>
      {hasError && (
        <Row>
          <ErrorAlert onShowAlert={(show) => showError(show)} />
        </Row>
      )}
      <Row className="mb-3">
        {!cats || cats.length === 0 ? (
          <Col>
            <p>No cats available</p>
          </Col>
        ) : (
          <>
            {cats.map((cat, idx) => (
              <Col md="3" sm="6" key={idx}>
                <Card key={cat.id} className="mb-3">
                  <Card.Img variant="top" src={cat.url} rounded="true" />
                  <Card.Body>
                    <Button
                      variant="primary"
                      block
                      size="lg"
                      value={cat}
                      onClick={(e) => handleDetailsClick(e, cat)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
      <Row className="mb-3">
        <Col>
          <Button
            variant="success"
            disabled={catsFetchCount < PAGE_LIMIT}
            onClick={handleLoadClick}
          >
            {isLoadingCats ? 'Loading cats...' : 'Load more'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
