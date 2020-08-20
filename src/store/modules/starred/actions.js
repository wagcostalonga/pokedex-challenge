import { createAction } from '@reduxjs/toolkit';

export const addToStarred = createAction('starred/add_pokemon');
export const removeFromStarred = createAction('starred/remove_pokemon');