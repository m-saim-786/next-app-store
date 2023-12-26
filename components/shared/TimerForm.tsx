import { useState } from "react";

const TimerForm = ({ onSubmit }: { onSubmit: (value: number) => void }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(minutes * 60 + seconds);

    setMinutes(0);
    setSeconds(0);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex space-x-2 justify-between items-end">
          <div className="w-full">
              <label>Minutes</label>
              <input
                className="w-full p-2 rounded-md border-2"
                type="number"
                onChange={(event) => setMinutes(+event.target.value)}
                value={minutes}
              />
            <label>Seconds</label>
            <input
              className="w-full p-2 rounded-md border-2"
              type="number"
              onChange={(event) => setSeconds(+event.target.value)}
              value={seconds}
            />
          </div>
          <input
            type="submit"
            value="Start"
            className="bg-blue-500 rounded-md text-white py-2.5 px-4"
          />
        </div>
      </form>
    </>
  );
};

export default TimerForm;
