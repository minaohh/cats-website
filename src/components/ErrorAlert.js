import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorAlert = ({ show = true, onShowAlert }) => {
  if (show) {
    return (
      <Alert variant="danger" onClose={() => onShowAlert(false)} dismissible>
        <Alert.Heading>Oh snap!</Alert.Heading>
        <p>
          Apologies but we could not load new cats for you at this time! Miau!
        </p>
      </Alert>
    );
  }
};

export { ErrorAlert };
