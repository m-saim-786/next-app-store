"use client";
import { Story } from "@prisma/client";
import { useRouter } from "next/navigation";
import InputForm from "./InputForm";
import { useState } from "react";

type StoriesProps = {
  stories: Story[];
};
const Stories = ({ stories }: StoriesProps) => {
  const [storyList, setStoryList] = useState(stories);
  const router = useRouter();

  const addStory = async (title: string) => {
    try {
      const { story }: { story: Story } = await fetch(`/api/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
        }),
      }).then((res) => res.json());

      setStoryList((prev) => [...prev, story]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeStory = async (id: string) => {
    try {
      const { story }: { story: Story } = await fetch(`/api/stories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setStoryList((prev) => prev.filter((item) => item.id !== story.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <InputForm onSubmit={addStory} />
      <div className="flex">
        {storyList.map((story) => (
          <div
            key={story.id}
            className="story flex flex-col items-center space-y-2"
          >
            <div
              className="relative cursor-pointer w-32 h-16 shadow-md flex justify-center items-center hover:bg-gray-100 rounded-md"
              onClick={() => router.push(`/apps/todo/${story.id}`)}
            >
              <h1>{story.name}</h1>
            </div>
            <button
              className="bg-red-400 px-5 py-2 rounded-sm w-28 hover:bg-red-500"
              onClick={() => removeStory(story.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stories;
