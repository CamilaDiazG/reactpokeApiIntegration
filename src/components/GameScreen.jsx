import React from "react"

const GameScreen = ({ myPokeSelection, pcPokeSelection }) => {
  return (
    <div className="w-[400px] h-[250px] border-4 border-solid rounded-2xl flex items-center justify-around gap-4">
      <div className="flex flex-col items-center gap-2">
        <p>{myPokeSelection[0].name}</p>
        <img
          src={myPokeSelection[0].sprites?.front_default}
          alt={myPokeSelection[0].name}
          className="w-25 h-25"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p>{pcPokeSelection[0].name}</p>
        <img
          src={pcPokeSelection[0].sprites?.front_default}
          alt={pcPokeSelection[0].name}
          className="w-25 h-25"
        />
      </div>
    </div>
  )
}

export default GameScreen