import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';

import './styles.css';

const PokemonStarred = ({ handleRemoveFromStarred, handleGoToDetails }) => {
  const starred = useSelector(state => state.starred.map(pokemon => ({
     ...pokemon,
    }))
  );

  return (
    <div id="poke-star">
      <h3>You may carry up just 6 pokemons at once!</h3>
      <div className="line"/>

      <ul>
        {starred.map(pokemon => (
          <li key={pokemon.id}>
            <button
              className="go-to-details"
              type="button"
              onClick={() => handleGoToDetails(pokemon.name)}
            >
              <span>{pokemon.name}</span>
            </button>
            <button
              className="remove"
              type="button"
              onClick={() => handleRemoveFromStarred(pokemon.name)}
            >
              <FiX />
            </button>
          </li>
        ))}
      </ul>

      <div className="line"/>

      <div className="footer">
        <Link to="/">
          <FiArrowLeft />
          <small>
            Back
          </small>
        </Link>
      </div>
    </div>
  );
}

export default PokemonStarred;





