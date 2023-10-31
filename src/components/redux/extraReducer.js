/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const POKEMON = "https://pokeapi.co/api/v2/pokemon/";

export const getAllPoks = createAsyncThunk("get", async () => {
  return axios({
    method: "GET",
    url: POKEMON,
  }).then((res) => res.data);
});

export const getPokemonWithId = createAsyncThunk("get/id", async (id) => {
  return axios({
    method: "GET",
    url: POKEMON + id,
  }).then((res) => res.data);
});
const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemons: [],
    pokemon:null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPoks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPoks.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      });
      builder
      .addCase(getPokemonWithId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPokemonWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload;
      });
  },
});
export default pokemonSlice.reducer