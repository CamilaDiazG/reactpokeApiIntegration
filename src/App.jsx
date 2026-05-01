import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import useFetch from './hooks/useFetch'
import Screen from './components/ScreenPantalla'
import LeftControl from './components/LeftControl'
import RightControl from './components/RightControl'
import GameScreen from './components/GameScreen'

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  const {data, loading, error} = useFetch(url)
  const [position, setPosition] = useState(1);
  const [pokemones, setPokemones] = useState([]);
  const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url);
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => {
      setPokemones(values);
    });
  };

  useEffect(() => {
    getListPokemones()
  }, [data])
  

  const handleDirection = (direction) => {
   
    switch(direction) {
      case 'right':
        setPosition((prev) => prev + 1);
        break;
      case 'left':
        setPosition((prev) => prev - 1);
        break;

      case 'up':
        setPosition((prev) => prev - 4) 
        break;

      case 'down':
        setPosition((prev) => prev + 4)
        break;

      default:
        break;
    }
  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const computerSelection=() => {
    const rnd = getRandomInt(1, 100)
    const pc = pokemones.filter((p) => p.id === rnd)
    setPcPokeSelection(pc)
  }

  const [myPokeSelection, setMyPokeSelection] = useState([])
  const [pcPokeSelection, setPcPokeSelection] = useState([])

  const handleSelection = () => {
    const selectPokemon = pokemones.filter((p) => p.id === position)
    setMyPokeSelection(selectPokemon)//agregado
    computerSelection()
  }

  console.log('my selection', myPokeSelection)
  console.log('pc selection', pcPokeSelection)

  return (

    <>
    <div className="flex items-center gap-4">
    <LeftControl handleDirection={handleDirection} />
    {myPokeSelection.length && pcPokeSelection.length ? (<GameScreen myPokeSelection={myPokeSelection} pcPokeSelection={pcPokeSelection}/>) : (<Screen pokemones={pokemones} position={position} />)}
    
    <RightControl handleSelection={handleSelection} />
    </div>
    </>
    
  )
}
export default App
