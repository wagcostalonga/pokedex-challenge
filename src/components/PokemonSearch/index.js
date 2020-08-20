import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi';

import './styles.css';

function PokemonSearch({
  loading,
  handlePrevPage,
  handleNextPage,
  handleGoToDetails,
  handleSubmit,
  pokemons,
  nextUrl,
  prevUrl
}) {

  return (
    <div id="poke-search">
      <h2>What pokemon do you choose?</h2>
      <div className="line"/>

      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Name or ID: </label>
        <input type="text" id="search" name="name" />
        <button type="submit">Go!</button>
      </form>

      <div className="list-container">
        <button type="button" onClick={
          prevUrl && handlePrevPage}>
          <FiArrowLeft />
        </button>

        { loading ? <strong>Loading...</strong> :(
          <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.name} value={pokemon.name}>
              <button type="button"
                onClick={() => handleGoToDetails(pokemon.name)}>
                  {pokemon.name}
              </button>
            </li>
          ))}
        </ul>
        )}

        <button type="button" onClick={
          nextUrl && handleNextPage}>
          <FiArrowRight />
        </button>
      </div>
      <div className="line"/>

      <div className="footer">
        <Link to="/starred">
          <small>
            See your starred pokemons list
          </small>
          <FiStar />
        </Link>
      </div>
    </div>
  );
}

export default PokemonSearch;





