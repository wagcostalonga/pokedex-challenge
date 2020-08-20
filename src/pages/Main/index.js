import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import PokemonSearch from '../../components/PokemonSearch';
import PokemonDetailView from '../../components/PokemonDetailView';
import PokemonStarred from '../../components/PokemonStarred';

import api from '../../services/api';
import * as StarredActions from '../../store/modules/starred/actions';


import './styles.css';

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('/pokemon?limit=10');
  const [prevUrl, setPrevUrl] = useState();
  const [nextUrl, setNextUrl] = useState();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(true);

  const dispatch = useDispatch();

  const history = useHistory();

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
    const name = e.target.elements.name.value.toLowerCase().trim();
    setLoadingDetails(true);
    const response = await api.get(`pokemon/${name}`);
    const { data } = response;

    if (name !== '') {
      setDetails(data);
    }

    setLoadingDetails(false);
  },[]);

  /** REDUX */
  const handleAddStarred = useCallback((pokemon) => {
    dispatch(StarredActions.addToStarred(pokemon));
    history.push('/starred');
  },[dispatch, history]);


  const handleRemoveFromStarred = useCallback(() => {
    dispatch(StarredActions.removeFromStarred());
  }, [dispatch]);


  return (
    <div id="main">
      <h1>Pokedex Challenge</h1>
      <div className="poke-search">
        <div className="display">
          <Switch>
            <Route path="/" exact>
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
            </Route>
            <Route path="/starred">
              <PokemonStarred
                handleRemoveFromStarred={handleRemoveFromStarred}
                handleGoToDetails={handleGoToDetails}
              />
            </Route>
          </Switch>

        </div>
      </div>

      <div className="poke-detail-view">
        <div className="display">
          { details && (
            loadingDetails ? <h4>Loading...</h4> : (
              <PokemonDetailView
                details={details}
                handleAddStarred={handleAddStarred}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;