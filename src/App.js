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
  const [filteredData, setFilteredData] = useState(pokeData);
  const [searchTerm, setSearchTerm] = useState(null);
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
      setFilteredData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  console.log(pokeData);
  useEffect(() => {
    pokeFun();
  }, [url,]);


const handleInputChange = (event) => {
  const newSearchTerm = event.target.value;
  setSearchTerm(newSearchTerm);
  // Filter the data based on the search term
  const filteredResults = filteredData.filter((item) =>
  item?.name.toLowerCase().includes(newSearchTerm.toLowerCase())
  );
  setFilteredData(filteredResults);
  getPokemon(filteredResults)
};
  
  return (
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
              dispatch(getPokemonWithId(el.id)) && navigate(`/pokemon/${el.id}`)
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
  );
}

export default App;
