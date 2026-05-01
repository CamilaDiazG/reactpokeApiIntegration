import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import Screen from "./components/ScreenPantalla";
import LeftControl from "./components/LeftControl";
import RightControl from "./components/RightControl";
import GameScreen from "./components/GameScreen";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
  const { data, loading, error } = useFetch(url);

  const [position, setPosition] = useState(1);
  const [pokemones, setPokemones] = useState([]);

  const [myPokeSelection, setMyPokeSelection] = useState(null);
  const [pcPokeSelection, setPcPokeSelection] = useState(null);

  const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url) || [];
    const plist = list.map((l) => fetch(l.url).then((res) => res.json()));

    Promise.all(plist).then((values) => {
      setPokemones(values);
    });
  };

  useEffect(() => {
    if (data?.results) {
      getListPokemones();
    }
  }, [data]);

  const handleDirection = (direction) => {
    setPosition((prev) => {
      let next = prev;

      switch (direction) {
        case "right":
          next = prev + 1;
          break;
        case "left":
          next = prev - 1;
          break;
        case "up":
          next = prev - 4;
          break;
        case "down":
          next = prev + 4;
          break;
        default:
          next = prev;
      }

      if (next < 1) next = 1;
      if (next > pokemones.length) next = pokemones.length;

      return next;
    });
  };

  const getRandomPokemon = () => {
    if (!pokemones.length) return null;

    const randomIndex = Math.floor(Math.random() * pokemones.length);
    return pokemones[randomIndex];
  };

  const handleSelection = () => {
    const selectedPokemon = pokemones.find((p) => p.id === position);
    const randomPokemon = getRandomPokemon();

    if (!selectedPokemon || !randomPokemon) return;

    setMyPokeSelection(selectedPokemon);
    setPcPokeSelection(randomPokemon);
  };

  const handleReset = () => {
    setMyPokeSelection(null);
    setPcPokeSelection(null);
    setPosition(1);
  };

  if (loading) {
    return <h1 className="text-center mt-10 text-2xl">Cargando pokémon...</h1>;
  }

  if (error) {
    return <h1 className="text-center mt-10 text-2xl">Ocurrió un error</h1>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <div className="flex items-center gap-4">
        <LeftControl handleDirection={handleDirection} />

        {myPokeSelection && pcPokeSelection ? (
          <GameScreen
            myPokeSelection={myPokeSelection}
            pcPokeSelection={pcPokeSelection}
            handleReset={handleReset}
          />
        ) : (
          <Screen pokemones={pokemones} position={position} />
        )}

        <RightControl
          handleSelection={handleSelection}
          handleReset={handleReset}
          inBattle={!!myPokeSelection}
        />
      </div>
    </div>
  );
}

export default App;