import React, { useContext, useState } from 'react';
import tableContext from '../context/tableContext';

const Filter = () => {
  const { filterByNumericValues, setNumeric,
    setFilters, filters, setData, initPlanets } = useContext(tableContext);

  const [coluna, setColuna] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const filterClick = () => {
    setFilters([...filters, filterByNumericValues]);
    const newCollumn = coluna.filter((option) => option !== filterByNumericValues.column);
    console.log('TIRA OPTION', newCollumn);
    setColuna(newCollumn);
  };

  const removeFilter = ({ target }) => {
    setData(initPlanets);
    console.log(target.name, filters);
    const removed = filters.filter((i) => i.collumn !== target.name);
    console.log('remove try', removed);
    setFilters(removed);
  };

  const resetFilter = () => {
    setFilters([]);
  };
  // const colunas = ['population',
  //   'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  return (
    <div>
      <label htmlFor="collumn">
        coluna
        <select
          data-testid="column-filter"
          name="collumn"
          id="collumn"
          //   value={ filterByNumericValues.collumn }
          onChange={ ({ target }) => setNumeric({
            ...filterByNumericValues, collumn: target.value }) }
        >
          {/* {!filters.includes('population')
         && <option value="population">population</option>}

          {!filters.includes('orbital_period')
         && <option value="orbital_period">orbital_period</option>}

          {!filters.includes('diameter')
         && <option value="diameter">diameter</option>}

          {!filters.includes('rotation_period')
         && <option value="rotation_period">rotation_period</option>}

          {!filters.includes('surface_water')
         && <option value="surface_water">surface_water</option>} */}

          {
            coluna.map((col, i) => (
              <option data-testid={ `${col}1` } value={ col } key={ i }>{ col }</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="comparison">
        operador
        <select
          data-testid="comparison-filter"
          name="comparisson"
          id="comparisson"
          //   value={ filterByNumericValues.comparison }
          onChange={ ({ target }) => setNumeric({
            ...filterByNumericValues, comparison: target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          id="value"
          value={ filterByNumericValues.value }
          onChange={ ({ target }) => setNumeric({
            ...filterByNumericValues, value: target.value }) }
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ filterClick }>
        {/* onClick={ setFilters([...filters, filterByNumericValues]) } */}
        Filtrar
      </button>
      <br />
      <br />
      {
        filters.length > 0 ? (
          <div>
            {
              filters.map((ftr, i) => (
                <div key={ `div_${i}` }>
                  <span key={ i } data-testid="filter">
                    { ftr.collumn }
                    _
                    { ftr.comparison }
                    _
                    { ftr.value }
                    <button
                      type="button"
                      name={ ftr.collumn }
                      data-testid={ ftr.collumn }
                      onClick={ removeFilter }
                    >
                      X
                    </button>
                  </span>
                </div>
              ))
            }
            <button // reset all filters
              type="button"
              onClick={ resetFilter }
              data-testid="button-remove-filters"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          null
        )
      }
    </div>
  );
};

export default Filter;
