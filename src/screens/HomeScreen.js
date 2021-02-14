import React, { useState, useEffect, useContext, useParams } from 'react';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { catsApi } from '../api/catsApi';
import BreedContext from '../context/BreedContext';
import { ErrorAlert } from '../components';

const PAGE_LIMIT = 10;

const HomeScreen = () => {
  const [breedContext, setBreedContext] = useContext(BreedContext);
  const history = useHistory();

  const [catBreeds, setCatBreeds] = useState(null);
  const [cats, setCats] = useState({});
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

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

  const handleViewDetailsClick = (e, cat) => {
    history.push(`/${cat.id}`);
  };

  const handleShowError = (show) => {
    initializeState();
    setHasError(show);
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

      const response = await catsApi.get(
        `/images/search?breed_id=${breedContext.breed}&limit=${PAGE_LIMIT}&page=${pageNum}`
      );

      let prevCatCount = Object.keys(cats).length;
      let catList = { ...cats };
      response.data.map((val, i) => (catList[val.id] = val));

      setCats(catList);
      setLoadMore(
        prevCatCount === 0 ||
          prevCatCount === PAGE_LIMIT ||
          prevCatCount !== Object.keys(cats).length
      );
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
    window.scrollTo(0, 0);
    getBreedsAsync();
  }, []);

  //----------------
  // Helper Methods
  //----------------
  const loadCats = () => {
    loadCatsAsync(pageNum);
    setPageNum(pageNum + 1);
  };

  const initializeState = () => {
    setCats({});
    setPageNum(1);
    setLoadMore(true);
  };

  const setHasError = (hasErr) => {
    setBreedContext({ ...breedContext, hasError: hasErr });
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
          <p>Breed</p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col lg="3" md="4" sm="6">
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
      {breedContext.hasError && (
        <Row>
          <Col>
            <ErrorAlert onShowAlert={(show) => handleShowError(show)} />
          </Col>
        </Row>
      )}
      <Row className="mb-3">
        {!cats || cats.length === 0 ? (
          <Col>
            <p>No cats available</p>
          </Col>
        ) : (
          <>
            {Object.keys(cats).map((id, idx) => {
              let cat = cats[id];

              return (
                <Col md="3" sm="6" key={idx}>
                  <Card key={cat.id} className="mb-3">
                    <Card.Img variant="top" src={cat.url} rounded="true" />
                    <Card.Body>
                      <Button
                        variant="primary"
                        block
                        size="lg"
                        value={cat}
                        onClick={(e) => handleViewDetailsClick(e, cat)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </>
        )}
      </Row>
      <Row className="mb-3">
        <Col>
          {loadMore === true && (
            <Button
              variant="success"
              disabled={Object.keys(cats).length === 0}
              onClick={handleLoadClick}
            >
              {isLoadingCats ? 'Loading cats...' : 'Load more'}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
