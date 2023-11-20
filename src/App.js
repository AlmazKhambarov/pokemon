/** @format */
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPoks, getPokemonWithId } from "./components/redux/extraReducer";
import PokemonInfo from "./components/PokemonInfo";
import { useNavigate } from "react-router-dom";

function App() {
  const { pokemons } = useSelector((state) => state.pokemons);
  var navigate = useNavigate();

  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPoks());
  }, []);
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    console.log(res);
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokemonData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        console.log(state);
        return state;
      });
    });
  };
  console.log(filteredData);
  useEffect(() => {
    pokeFun();
  }, [url]);
  useEffect(() => {
    setFilteredData(pokemonData);
  }, [pokemonData]);

  const handleInputChange = (event) => {
    let data = filteredData;
    const filteredResults = data.filter((item) =>
      item?.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filteredResults);
    if (!event.target.value) {
      setFilteredData(pokemonData);
    }
  };
  console.log(filteredData);
  return (
    <>
      <div class='container'>
        <div class='upperbox'>
          <div class='circle'>
            <img
              src='https://i.pinimg.com/736x/b1/06/b3/b106b356085297efb35b87ef9122e03a.jpg'
              alt=''
            />
          </div>
          <div class='logo'>
            <input
              placeholder='Search...'
              type='text'
              className='searchBar'
              onChange={handleInputChange}
            />
          </div>
          <div class='circle'>
            <img
              src='https://i.pinimg.com/736x/b1/06/b3/b106b356085297efb35b87ef9122e03a.jpg'
              alt=''
            />
          </div>
          <div class='opening-box'></div>
        </div>
        {filteredData?.map((el) => (
          <div>
            <div
              class='card'
              key={el.id}
              onClick={() =>
                dispatch(getPokemonWithId(el.id)) &&
                navigate(`/pokemon/${el.id}`)
              }>
              <div class='card-header'>
                <img src={el.sprites.front_default} alt='' />
              </div>
              <div class='card-body'>
                <h3>{el.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='btn-group'>
        {prevUrl && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(prevUrl);
            }}>
            Previous
          </button>
        )}

        {nextUrl && (
          <button
            onClick={() => {
              setPokemonData([]);
              setUrl(nextUrl);
            }}>
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default App;
