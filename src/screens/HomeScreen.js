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
  //Breeds
  const [catBreeds, setCatBreeds] = useState(null);
  const [hasError, setHasError] = useState(false);
  //Cats
  const [cats, setCats] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [catsFetchCount, setCatsFetchCount] = useState(0);

  const getBreedsAsync = async () => {
    try {
      setHasError(false);

      const response = await catsApi.get('/breeds');
      setCatBreeds([...response.data]);
    } catch (err) {
      setHasError(true);
    }
  };

  const handleCatBreedChanged = (e) => {
    setBreedContext({ ...breedContext, breed: e.target.value });
    setCats([]);
    setPageNum(0);
  };

  const loadCats = () => {
    loadCatsAsync(pageNum);
    setPageNum(pageNum + 1);
  };

  const handleLoadClick = () => {
    loadCats();
  };

  const loadCatsAsync = async (pageNum) => {
    try {
      setIsLoadingCats(true);
      setHasError(false);

      const response = await catsApi.get(
        `/images/search?breed_ids=${breedContext.breed}&limit=${PAGE_LIMIT}&page=${pageNum}&order=DESC`
      );

      setCats([...cats, ...response.data]);
      setCatsFetchCount(response.data.length);
      // console.log('fetch count:', catsFetchCount);
      // console.log('selected breed cats', response);
    } catch (err) {
      setHasError(true);
    }
    setIsLoadingCats(false);
  };

  const handleDetailsClick = (e, cat) => {
    setBreedContext({ ...breedContext, cat: { ...cat } });
    console.log('breedContext', breedContext);
    history.push(`/${cat.id}`);
  };

  useEffect(() => {
    if (breedContext.breed !== '') {
      loadCats();
    }
  }, [breedContext]);

  useEffect(() => {
    getBreedsAsync();
  }, []);

  const showError = (show) => {
    setHasError(show);
  };

  return (
    <Container className="mt-4 mb-4">
      <Row className="mb-3">
        <h1>Cat 🐈 Browser</h1>
      </Row>
      <Row>
        <p>Breeds</p>
      </Row>
      <Row className="mb-5">
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
      </Row>
      {hasError && (
        <Row>
          <ErrorAlert onShowAlert={(show) => showError(show)} />
        </Row>
      )}
      <Row className="mb-3">
        {!cats || cats.length === 0 ? (
          <p>No cats available</p>
        ) : (
          <>
            {cats.map((cat, idx) => (
              <Col md="3" sm="6" key={idx}>
                <Card key={cat.id} className="mb-3">
                  <Card.Img
                    variant="top"
                    src={cat.url}
                    rounded="true"
                    style={{ maxWidth: '18rem' }}
                  />
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
        <Button
          variant="success"
          disabled={catsFetchCount < PAGE_LIMIT}
          onClick={handleLoadClick}
        >
          {isLoadingCats ? 'Loading cats...' : 'Load more'}
        </Button>
      </Row>
    </Container>
  );
};

export default HomeScreen;
