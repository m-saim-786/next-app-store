"use client";
import { useEffect, useState } from "react";
import StopwatchForm from "./StopwatchForm";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [pause, setPause] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (pause || timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [pause, timer]);

  const displayCounter = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value % 60);
    return (
      <div className="w-fit px-5 py-2 bg-slate-300 rounded-md outline">
        <span>{minutes.toString().padStart(2, "0")}</span> : <span>{seconds.toString().padStart(2, "0")}</span>
      </div>
    );
  };

  const reset = () => {
    setTimer(0);
    setLaps([]);
  };

  return (
    <>
      <StopwatchForm onSubmit={(value) => setTimer(value)} />
      <span className="m-5 text-center">{timer > 0 ? displayCounter(timer) : "Press start to begin..."}</span>
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 rounded-md text-white py-2 px-4"
          onClick={() => setPause((prev) => !prev)}
        >
          {pause ? "Pause" : "Start"}
        </button>
        <button
          className="bg-blue-500 rounded-md text-white py-2 px-4"
          onClick={() => setLaps((prev) => [...prev, timer])}
        >
          Lap
        </button>
        <button
          className="rounded-md bg-red-500 p-2 text-white"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <h2>Laps</h2>
      <ul>
        {laps.map((lap, i) => (
          <li key={i}>{displayCounter(lap)}</li>
        ))}
      </ul>
    </>
  );
};

export default Timer;
