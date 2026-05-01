const LeftControl = ({ handleDirection }) => {

  return (
    <div className="w-[100px] h-[250px] border-4 border-solid rounded-2xl flex flex-col items-center justify-center gap-4">
      <button
      onClick={() => handleDirection('left')}
      className="text-2xl border px-3 py-1 rounded">&lt;</button>
      
      <div className="flex gap-2">
        <button
        onClick ={() => handleDirection('up')}
        className="text-2xl border px-3 py-1 rounded">^</button>
        <button
        onClick={() => handleDirection('down')}
        className="text-2xl border px-3 py-1 rounded">v</button>
      </div>
      <button 
      onClick={() => handleDirection('right')}
      className="text-2xl border px-3 py-1 rounded">&gt;</button>
    </div>
  )
}

export default LeftControl