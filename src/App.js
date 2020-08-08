import React, { useState, useEffect, useCallback } from 'react';

import PokemonSearch from './components/PokemonSearch';
import PokemonDetailView from './components/PokemonDetailView';

import api from './services/api';

import './styles/global.css';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('/pokemon?limit=10');
  const [prevUrl, setPrevUrl] = useState();
  const [nextUrl, setNextUrl] = useState();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function showPokemon() {
      await api.get(currentUrl).then(res => {
        setLoading(false);
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);
        setPokemons(res.data.results);
      });
    }

    showPokemon();
  },[currentUrl]);

  const handlePrevPage = useCallback(async () => {
    setCurrentUrl(prevUrl);
  },[prevUrl]);

  const handleNextPage = useCallback(async () => {
    setCurrentUrl(nextUrl);
  },[nextUrl]);

  const handleGoToDetails = useCallback(async (name) => {
    setLoadingDetails(true);
    const response = await api.get(`pokemon/${name}`);
    const { data } = response;
    setDetails(data);
    setLoadingDetails(false);
  },[]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    setLoadingDetails(true);
    const response = await api.get(`pokemon/${name}`);
    const { data } = response;

    if (name !== '') {
      setDetails(data);
    }

    setLoadingDetails(false);
  },[]);


  return (
    <div id="app">
      <h1>Pokedex Challenge</h1>
      <div className="poke-search">
        <div className="display">
          <PokemonSearch
            loading={loading}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handleGoToDetails={handleGoToDetails}
            handleSubmit={handleSubmit}
            pokemons={pokemons}
            prevUrl={prevUrl}
            nextUrl={nextUrl}
          />

        </div>
      </div>
      <div className="poke-detail-view">
        <div className="display">
          { details && (
            loadingDetails ? <h4>Loading...</h4> : (
              <PokemonDetailView details={details}/>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;