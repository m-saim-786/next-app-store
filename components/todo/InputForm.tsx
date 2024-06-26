"use client";
import { useState } from "react";

const InputForm = ({ onSubmit }: { onSubmit: (title: string) => Promise<void> }) => {
  const [title, setTitle] = useState("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() !== "")
      onSubmit(title.trim()).catch((err) => console.error(err));

    setTitle("");
  };

  return (
    <>
      <form onSubmit={submitHandler} className="mb-5">
        <div className="flex space-x-3">
          <input
            type="text"
            className="w-full p-2 rounded-md border-2"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required={true}
            placeholder="Enter title ..."
          />
          <input
            type="submit"
            value="Add"
            className="bg-blue-500 p-1 rounded-md text-white px-5"
          />
        </div>
      </form>
    </>
  );
};

export default InputForm;
