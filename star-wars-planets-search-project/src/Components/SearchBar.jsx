import React, { useContext } from 'react';
import tableContext from '../context/tableContext';

const Searchbar = () => {
  const { filterByName, setPlanet } = useContext(tableContext);

  // render() {
  //   const [planet, setPlanet] = useState();

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setPlanet(value);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          type="text"
          name="filterByName"
          id="filterByName"
          value={ filterByName }
          placeholder="Buscar Planeta"
          onChange={ onChangeHandler }
          data-testid="name-filter"
        />
      </div>
    </div>
  );
};

export default Searchbar;
