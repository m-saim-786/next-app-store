"use client"
const Toolbar = () => {

  const handleBold = () => {
    document.execCommand("bold")
  }

  const handleItlic = () => {
    document.execCommand("italic")
  }

  const handleUnderline = () => {
    document.execCommand("underline")
  }

  const handleStrikeThrough = () => {
    document.execCommand("strikeThrough")
  }

  const handleBackColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.execCommand("backColor", false, e.target.value)
  }

  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.execCommand("foreColor", false, e.target.value)
  }

  const handleUndo = () => {
    document.execCommand("undo")
  }

  const handleRedo = () => {
    document.execCommand("redo")
  }

  return (
    <div className="mb-2 flex space-x-2">
      <div>
        <button onClick={handleUndo} className="bg-slate-200 outline-1 p-2">{"<"}</button>
        <button onClick={handleRedo} className="bg-slate-200 outline-1 p-2 font-serif">{">"}</button>
      </div>

      <div>
        <button onClick={handleBold} className="bg-slate-200 outline-1 p-2">B</button>
        <button onClick={handleItlic} className="bg-slate-200 outline-1 p-2 font-serif"><em>I</em></button>
        <button onClick={handleUnderline} className="bg-slate-200 outline-1 p-2 underline">U</button>
        <button onClick={handleStrikeThrough} className="bg-slate-200 outline-1 p-2 line-through">S</button>
      </div>

      <div>
        <input type="color" onChange={handleBackColorChange}/>
        <input type="color" onChange={handleFontColorChange}/>
      </div>

      <div>
        <button onClick={handleBold} className="bg-slate-200 outline-1 p-2">•</button>
        <button onClick={handleItlic} className="bg-slate-200 outline-1 p-2 font-serif">1.</button>
      </div>
    </div>
  );
};

export default Toolbar;