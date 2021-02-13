import React, { useContext } from 'react';
import { Button, Container, Row, Card, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import BreedContext from '../context/BreedContext';

const CatDetails = () => {
  const history = useHistory();
  const [breedContext] = useContext(BreedContext);
  const [breed] =
    breedContext && breedContext.breeds && breedContext.breeds.length > 0
      ? breedContext.breeds
      : [];

  const handleBackClick = (e) => {
    history.goBack();
  };

  return (
    <Container>
      <Row>
        {breedContext && breedContext.breeds ? (
          <Card>
            <Card.Header>
              <Button variant="primary" onClick={handleBackClick}>
                Back
              </Button>
            </Card.Header>
            <Card.Img variant="top" src={breedContext.url} />
            <Card.Body>
              <h1>{breed.name}</h1>
              <h3>Origin: {breed.origin}</h3>
              {breed.temperament.split(',').map((val, idx) => (
                <Badge pill variant="primary" key={idx}>
                  {val}
                </Badge>
              ))}

              <Card.Text>{breed.description}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default CatDetails;
