import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from './extraReducer'
const store = configureStore({
    reducer:{
        pokemons:pokemonSlice
    }
})
export default store;