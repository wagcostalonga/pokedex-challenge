import { createReducer } from '@reduxjs/toolkit';

import { addToStarred, removeFromStarred } from './actions';

const starred = createReducer([], {
  [addToStarred]: (state, action) => {
    const { payload } = action;
    const { name } = payload;

    const pokemonExist = state.find(pokemon => pokemon.name === name);

    if(!pokemonExist && state.length <= 5) {
      state.push(payload);
    }
  },

  [removeFromStarred]: (state, action) => {
    const pokemonIndex = state.findIndex(
      pokemon => pokemon.name === action.payload
    );

    state.splice(pokemonIndex, 1);
  }
});

export default starred;