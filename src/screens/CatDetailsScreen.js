import React, { useContext } from 'react';
import {
  Button,
  Container,
  Row,
  Card,
  Badge,
  Breadcrumb,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import BreedContext from '../context/BreedContext';

const CatDetails = () => {
  const history = useHistory();
  const [breedContext] = useContext(BreedContext);
  const [breed] =
    breedContext &&
    breedContext.cat.breeds &&
    breedContext.cat.breeds.length > 0
      ? breedContext.cat.breeds
      : [];

  const handleBackClick = (e) => {
    history.goBack();
  };

  return (
    <Container className="mt-4 mb-4">
      {breedContext && breedContext.cat.breeds ? (
        <>
          <Row className="mb-3">
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                {/* <Link to="/">Home</Link> */}
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{breed.name}</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row className="mb-3">
            <Card>
              <Card.Header>
                <Button variant="primary" onClick={handleBackClick}>
                  Back
                </Button>
              </Card.Header>
              <Card.Img variant="top" src={breedContext.cat.url} />
              <Card.Body className="mx-4 mb-3">
                <Row className="mb-2">
                  <h1>{breed.name}</h1>
                </Row>
                <Row className="mb-3">
                  <h3>Origin: {breed.origin}</h3>
                </Row>
                <Row className="mb-3">
                  {breed.temperament.split(',').map((val, idx) => (
                    <Badge
                      pill
                      variant="primary"
                      key={idx}
                      style={{ marginRight: 7, padding: 10 }}
                    >
                      {val}
                    </Badge>
                  ))}
                </Row>
                <Row className="mb-3">
                  <Card.Text>{breed.description}</Card.Text>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </>
      ) : (
        <Row className="mb-3">
          <p>Loading...</p>
        </Row>
      )}
    </Container>
  );
};

export default CatDetails;
