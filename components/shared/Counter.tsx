"use client"

const Counter = ({ value }: { value: number }) => {

  const displayCounter = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value % 60);
    return (
      <div className="w-fit px-5 py-2 bg-slate-300 rounded-md outline">
        <span>{minutes.toString().padStart(2, "0")}</span> : <span>{seconds.toString().padStart(2, "0")}</span>
      </div>
    );
  };

  return <>
    { displayCounter(value) }
  </>
}

export default Counter;