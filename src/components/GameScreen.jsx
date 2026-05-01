import { useState } from "react";

const GameScreen = ({ myPokeSelection, pcPokeSelection, handleReset }) => {
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [turn, setTurn] = useState("player");
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("¡Comienza la batalla!");

  const attack = () => {
    if (winner) return;

    if (turn === "player") {
      const damage = Math.floor(Math.random() * 20) + 5;
      const newEnemyHp = Math.max(enemyHp - damage, 0);
      setEnemyHp(newEnemyHp);

      if (newEnemyHp <= 0) {
        setWinner(myPokeSelection.name);
        setMessage(`${myPokeSelection.name} gano la batalla`);
        return;
      }

      setMessage(
        `${myPokeSelection.name} ataco e hizo ${damage} de daño`
      );
      setTurn("enemy");

      setTimeout(() => {
        enemyAttack(newEnemyHp);
      }, 1000);
    }
  };

  const enemyAttack = () => {
    const damage = Math.floor(Math.random() * 20) + 5;
    const newPlayerHp = Math.max(playerHp - damage, 0);
    setPlayerHp(newPlayerHp);

    if (newPlayerHp <= 0) {
      setWinner(pcPokeSelection.name);
      setMessage(`${pcPokeSelection.name} gano la batalla`);
      return;
    }

    setMessage(`${pcPokeSelection.name} ataco e hizo ${damage} de daño`);
    setTurn("player");
  };

  return (
    <div className="w-[450px] min-h-[300px] border-4 border-solid rounded-2xl flex flex-col items-center justify-center gap-4 p-4 bg-black text-white">
      <h2 className="text-xl font-bold">Batalla Pokemoooooooon</h2>

      <div className="w-full flex justify-around items-center">
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold capitalize">{myPokeSelection.name}</p>
          <img
            src={myPokeSelection.sprites?.front_default}
            alt={myPokeSelection.name}
            className="w-24 h-24"
          />
          <p>HP: {playerHp}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-bold capitalize">{pcPokeSelection.name}</p>
          <img
            src={pcPokeSelection.sprites?.front_default}
            alt={pcPokeSelection.name}
            className="w-24 h-24"
          />
          <p>HP: {enemyHp}</p>
        </div>
      </div>

      <p className="text-center">{message}</p>

      {!winner ? (
        <button
          onClick={attack}
          disabled={turn !== "player"}
          className="border px-4 py-2 rounded bg-white text-black disabled:opacity-50"
        >
          Atacar
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-bold">Ganador: {winner}</h3>
          <button
            onClick={handleReset}
            className="border px-4 py-2 rounded bg-white text-black"
          >
            Volver a jugar
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;