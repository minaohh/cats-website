import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Badge,
  Breadcrumb,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import BreedContext from '../context/BreedContext';
import { catsApi } from '../api/catsApi';
import { ErrorAlert } from '../components';

const CatDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [breedContext, setBreedContext] = useContext(BreedContext);
  const [cat, setCat] = useState(null);

  const handleBackClick = (e) => {
    history.goBack();
  };

  const getCatImageAsync = async (imageId) => {
    try {
      setBreedContext({ ...breedContext, hasError: false });

      const response = await catsApi.get(`/images/${imageId}`);
      setCat(response.data);
    } catch (err) {
      setBreedContext({ ...breedContext, hasError: true });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCatImageAsync(id);
  }, []);

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>
              {cat && cat.breeds[0].name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {breedContext.hasError && (
        <Row>
          <Col>
            <ErrorAlert
              onShowAlert={(show) =>
                setBreedContext({ ...breedContext, hasError: show })
              }
            />
          </Col>
        </Row>
      )}
      {cat && (
        <>
          <Row className="mb-3">
            <Col>
              <Card>
                <Card.Header>
                  <Button variant="primary" onClick={handleBackClick}>
                    Back
                  </Button>
                </Card.Header>
                <Card.Img variant="top" src={cat.url} />
                <Card.Body className="mx-4 mb-3">
                  <Row className="mb-2">
                    <h1>{cat.breeds[0].name}</h1>
                  </Row>
                  <Row className="mb-3">
                    <h3>Origin: {cat.breeds[0].origin}</h3>
                  </Row>
                  <Row className="mb-3">
                    {cat.breeds[0].temperament.split(',').map((val, idx) => (
                      <Badge
                        pill
                        variant="primary"
                        key={idx}
                        style={{ marginRight: 7, padding: 10, marginBottom: 5 }}
                      >
                        {val}
                      </Badge>
                    ))}
                  </Row>
                  <Row className="mb-3">
                    <Card.Text>{cat.breeds[0].description}</Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {!cat && !breedContext.hasError && (
        <Row className="mb-3">
          <Col>
            <p>Loading...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CatDetails;
