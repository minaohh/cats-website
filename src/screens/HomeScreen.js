import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';

import { catsApi } from '../api/catsApi';
import BreedContext from '../context/BreedContext';

const PAGE_LIMIT = 9;

const HomeScreen = () => {
  //Breeds
  const [catBreeds, setCatBreeds] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  //Cats
  const [cats, setCats] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingCats, setIsLoadingCats] = useState(false);
  const [catsFetchCount, setCatsFetchCount] = useState(0);
  const [breedContext, setBreedContext] = useContext(BreedContext);

  const getBreedsAsync = async () => {
    try {
      setIsLoadingBreeds(true);

      const response = await catsApi.get('/breeds');
      // console.log('breeds', response.data);

      setCatBreeds([...response.data]);
    } catch (err) {
      //Todo Add alert
    }

    setIsLoadingBreeds(false);
  };

  const handleCatBreedChanged = (e) => {
    setSelectedBreed(e.target.value);
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

      const response = await catsApi.get(
        `/images/search?breed_ids=${selectedBreed}&limit=${PAGE_LIMIT}&page=${pageNum}&order=DESC`
      );

      setCats([...cats, ...response.data]);
      setCatsFetchCount(response.data.length);
      console.log('fetch count:', catsFetchCount);
      // console.log('selected breed cats', response);
    } catch (err) {
      //Todo add alert
    }
    setIsLoadingCats(false);
  };

  const handleDetailsClick = (e, cat) => {
    console.log('handleDetailsClick', e);
    console.log('target', e.target);
    console.log('cat', cat);
    //Update context
    setBreedContext(cat);

    //Reroute
  };

  useEffect(() => {
    if (selectedBreed !== '') {
      loadCats();
    }
  }, [selectedBreed]);

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
        <select
          value={selectedBreed}
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
      <Row>
        {!cats || cats.length === 0 ? (
          <p>No cats available</p>
        ) : (
          <>
            {cats.map((cat, idx) => (
              <Col md="3" sm="6" key={idx}>
                <Card key={cat.id}>
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
      <Row>
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
