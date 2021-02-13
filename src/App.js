import './App.css';
import React, { useState } from 'react';

import BreedContext from './context/BreedContext';

import Home from './screens/HomeScreen';
import CatDetails from './screens/CatDetailsScreen';

function App() {
  const initialContextState = {};
  const [breedContext, setBreedContext] = useState(initialContextState);

  return (
    <BreedContext.Provider value={[breedContext, setBreedContext]}>
      <Home />
    </BreedContext.Provider>
  );
}

export default App;
