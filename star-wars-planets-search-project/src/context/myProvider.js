import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [initPlanets, setInitPlanets] = useState([]);
  const [filterByName, setPlanet] = useState('');
  const [filterByNumericValues, setNumeric] = useState({
    collumn: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const dataResponse = await response.json();
      // console.log('FEtch', dataResponse);
      setData(dataResponse);
      setInitPlanets(dataResponse);
    };
    fetchQuestions();
  }, []);

  return (
    <tableContext.Provider
      value={ {
        data,
        setData,
        filterByName,
        setPlanet,
        filterByNumericValues,
        setNumeric,
        filters,
        setFilters,
        initPlanets,
      } }
    >
      {children}
    </tableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
