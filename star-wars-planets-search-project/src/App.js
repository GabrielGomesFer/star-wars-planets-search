import React from 'react';
import './App.css';
import PlanetsTable from './Components/PlanetsTable';
import Provider from './context/myProvider';

function App() {
  return (
    <Provider>
      <PlanetsTable />
    </Provider>
  );
}
export default App;
