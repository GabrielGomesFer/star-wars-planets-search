import React, { useContext, useEffect } from 'react';
import tableContext from '../context/tableContext';
import Searchbar from './SearchBar';
import Filter from './Filter';

const PlanetsTable = () => {
  // const [initPlanets, setInitPlanets] = useState([]);
  const {
    data,
    filterByName,
    filters,
    setData,
    initPlanets,
  } = useContext(tableContext);
  // const valueData = data.results;
  // console.log(valueData);
  // console.log('filter by name console', filterByName);
  // console.log('FILTRADO', filtred);

  const collumnFilter = () => {
    if (filters.length > 0) {
      filters.forEach((element) => {
        if (element.comparison === 'maior que') {
          console.log('data', data);
          const filteredData = data.results.filter((item) => Number(item[element.collumn])
        > Number(element.value));
          // console.log(filteredData);
          setData({ results: filteredData });
        }
        if (element.comparison === 'menor que') {
          const filteredData = data.results.filter((item) => Number(item[element.collumn])
        < Number(element.value));
          console.log(filteredData);
          setData({ results: filteredData });
        }
        if (element.comparison === 'igual a') {
          const filteredData = data.results.filter((item) => Number(item[element.collumn])
        === Number(element.value));
          console.log(filteredData);
          setData({ results: filteredData });
        }
      });
    }
    if (filters.length < 1) {
      console.log(initPlanets.results);
      setData({ results: initPlanets.results });
    }
  };

  useEffect(() => { // DIDRENDER
    collumnFilter();
    console.log(filters);
  }, [filters]);

  return (
    <div>
      <Searchbar />
      <Filter />
      <table className="tableMaster">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diamenter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data.results
            && data.results.filter((planeta) => planeta.name.includes(filterByName))
              .map((item, index) => (
                <tr key={ index } data-testid="planet">
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
};
export default PlanetsTable;
