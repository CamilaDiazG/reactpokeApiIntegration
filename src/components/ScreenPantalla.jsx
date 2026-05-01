const ScreenPantalla = ({ pokemones, position }) => {
  return (
    <div className="w-[450px] h-[250px] overflow-y-auto border-4 border-solid rounded-2xl p-2 bg-black text-white">
      <div className="flex flex-wrap justify-center gap-2">
        {pokemones?.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              color: position === pokemon.id ? "red" : "white",
              borderColor: position === pokemon.id ? "red" : "white",
            }}
            className="flex flex-col items-center border-2 rounded p-2 w-[90px]"
          >
            <p className="capitalize text-sm">{pokemon.name}</p>
            <img
              src={pokemon?.sprites?.front_default}
              alt={pokemon.name}
              className="w-16 h-16"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenPantalla;