import React, { useContext } from 'react';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';

import BreedContext from '../context/BreedContext';

const CatDetails = () => {
  const [breedContext, setBreedContext] = useContext(BreedContext);

  return (
    <Container>
      <Row>
        {breedContext && (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Cat Breed</Card.Title>
              <Card.Text>Breed information</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Container>
  );
};

export default CatDetails;
