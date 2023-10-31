/** @format */

import React, { useEffect } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonWithId } from "./redux/extraReducer";
const PokemonInfo = () => {
  const { pokemon } = useSelector((state) => state.pokemons);
  var params = useParams();
  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemonWithId(params.id));
  }, []);
  console.log(pokemon);
  return (
    <>
      <div className='pokemon__modal'>
        <div className='card'>
          <div className='card-header'>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon ? pokemon?.id:null}.svg`}
              alt=''
            />
          </div>
          {pokemon?.abilities.map((el) => (
            <>
              <p className='card_'>{el.ability.name}</p>
            </>
          ))}
        </div>
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default PokemonInfo;
