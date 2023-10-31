/** @format */

import React, { useEffect } from "react";
import './PokemonInfo.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonWithId } from "./redux/extraReducer";
const PokemonInfo = () => {
  const { pokemon } = useSelector((state) => state.pokemons);
  var params = useParams();
  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemonWithId(params.id));
  }, []);
  // console.log(pokemon);
  var navigate = useNavigate()
  return (
    <div className="mainpok">
      <div className='pokemon__modal'>
        <div className='card'>
          <div className="back" onClick={()=>navigate(-1)}>Back</div>
          <div className='card-header'>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon ? pokemon?.id:null}.svg`}
              alt=''
            />
          </div>
         <div className="ability">
         <h1>Abilities</h1>
          {pokemon?.abilities.map((el) => (
            <>
              <p className='card_'>{el.ability.name}</p>
            </>
          ))}
         </div>
         <div className="stats">
          <h2>Stats</h2>
          <ul>
            {pokemon?.stats?.map(item=> (
               <li >{item.stat.name}:{item.base_stat}</li>
            ))}
          </ul>
         </div>
        </div>
      </div>
      <div className='w-screen'></div>
    </div>
  );
};

export default PokemonInfo;
