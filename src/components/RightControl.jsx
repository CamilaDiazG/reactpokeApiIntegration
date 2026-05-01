const RightControl = ({ handleSelection, handleReset, inBattle }) => {
  return (
    <div className="w-[100px] h-[250px] border-4 border-solid rounded-2xl flex flex-col items-center justify-center gap-4">
      <button
        onClick={handleSelection}
        className="text-2xl border px-3 py-1 rounded"
      >
        a
      </button>

      <div className="flex gap-2">
        <button className="text-2xl border px-3 py-1 rounded">y</button>
        <button className="text-2xl border px-3 py-1 rounded">x</button>
      </div>

      <button
        onClick={handleReset}
        className="text-2xl border px-3 py-1 rounded"
      >
        b
      </button>

      {inBattle && <p className="text-xs text-center">B = reset</p>}
    </div>
  );
};

export default RightControl;