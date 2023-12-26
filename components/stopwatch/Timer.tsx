"use client";
import { useEffect, useState } from "react";
import TimerForm from "../shared/TimerForm";
import Counter from "../shared/Counter";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [pause, setPause] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (pause || timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [pause, timer]);

  const reset = () => {
    setTimer(0);
    setLaps([]);
  };

  return (
    <>
      <TimerForm onSubmit={(value) => setTimer(value)} />
      <span className="m-5 text-center">{timer > 0 ? <Counter value={timer}/> : "Press start to begin..."}</span>
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
          <li key={i}>{<Counter value={lap} />}</li>
        ))}
      </ul>
    </>
  );
};

export default Timer;
