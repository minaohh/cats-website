import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BreedContext from './context/BreedContext';

import Home from './screens/HomeScreen';
import CatDetails from './screens/CatDetailsScreen';

function App() {
  const initialContextState = {};
  const [breedContext, setBreedContext] = useState(initialContextState);

  return (
    <BreedContext.Provider value={[breedContext, setBreedContext]}>
      <Router>
        <Switch>
          <Route path="/:id">
            <CatDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </BreedContext.Provider>
  );
}

export default App;
