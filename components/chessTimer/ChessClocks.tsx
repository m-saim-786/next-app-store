"use client"
import { useEffect, useState } from "react";
import TimerForm from "../shared/TimerForm";
import Counter from "../shared/Counter";

const ChessClocks = () => {
  const [p1Timer, setP1Timer] = useState({ value: 0, pause: false })
  const [p2Timer, setP2Timer] = useState({ value: 0, pause: true })

  const onSubmit = (value: number) =>  {
    setP1Timer((prev) => ({ ...prev, value: value }))
    setP2Timer((prev) => ({ ...prev, value: value }))
  }

  useEffect(() => {
    if (p1Timer.pause || p1Timer.value <= 0) return;

    const interval = setInterval(() => setP1Timer((prev) => ({ ...prev, value: prev.value - 1 })), 1000);

    return () => clearInterval(interval);
  }, [p1Timer]);


  useEffect(() => {
    if (p2Timer.pause || p2Timer.value <= 0) return;

    const interval = setInterval(() => setP2Timer((prev) => ({ ...prev, value: prev.value - 1 })), 1000);

    return () => clearInterval(interval);
  }, [p2Timer]);

  return <>
    <TimerForm onSubmit={onSubmit} />
    <div className="flex justify-between">
      <div>
        <p>Player 1</p>
        <Counter value={p1Timer.value} />
        <button onClick={() => {
          setP1Timer((prev) => ({ ...prev, pause: true }))
          setP2Timer((prev) => ({ ...prev, pause: false }))
        }} className={`${!p1Timer.pause ? "bg-blue-500" : "bg-slate-400"} rounded-md text-white py-2 px-4`} disabled={p1Timer.pause}>{ p1Timer.pause ? "Running" : "Stop" }</button>
      </div>
      <div>
        Player 2
        <Counter value={p2Timer.value} />
        <button onClick={() => {
          setP1Timer((prev) => ({ ...prev, pause: false }))
          setP2Timer((prev) => ({ ...prev, pause: true }))
        }} className={`${!p2Timer.pause ? "bg-blue-500" : "bg-slate-400"} rounded-md text-white py-2 px-4`} disabled={p2Timer.pause}>{ p2Timer.pause ? "Running" : "Stop" }</button>
      </div>
    </div>
  </>
}

export default ChessClocks;