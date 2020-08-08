import React from 'react';

import './styles.css';

function PokemonDetailView({ details }) {

  return (
    <>
      { details && (
        <div id="poke-detail-view">
        <div className="perfil">
          <img
            src={details?.sprites.other.dream_world.front_default}
            alt="Pokemon"
          />
          <h3>#{details?.id} {details?.name}</h3>
          <div className="poke-types">
            {details?.types[0] ? (
              <small>{details?.types[0].type.name}</small>
            ) : null}
            {details?.types[1] ? (
              <small>{details?.types[1].type.name}</small>
            ) : null}
          </div>
        </div>

        <div className="separator" />

        <div className="info">
          <ul>
            <li>Height:
              <span>{details?.height}</span>
            </li>
            <li>Weight:
              <span>{details?.weight}</span>
            </li>
            <li>Speed:
              <span>{details?.stats[5].base_stat}</span>
            </li>
            <li>Attack:
              <span>{details?.stats[1].base_stat}</span>
            </li>
            <li>Defense:
              <span>{details?.stats[3].base_stat}</span>
            </li>
            <li>HP:
              <span>{details?.stats[0].base_stat}</span>
            </li>
          </ul>
        </div>
      </div>
      )}
    </>
  );
}

export default PokemonDetailView;