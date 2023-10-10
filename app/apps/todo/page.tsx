"use client"
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type TodoItem = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export default function Todo() {

  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos))
      .catch((err) => console.log(err));
  }, [])
  
  const displayTodoList = () =>
    todoList.sort((a, b) => a.isCompleted ? 1 : -1 ).map((todo) => (
      <TodoItem key={todo.id} item={todo} onChecked={toggleComplete} onDelete={removeTodo} />
    ));

  const addTodo = async (title: string) => {
    await fetch(`/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => res.json())
      .then(({ todo }: { todo: Todo }) =>
        setTodoList((prev) => [...prev, todo]),
      )
      .catch((err) => console.error(err));
  };

  const removeTodo = async (id: number) => {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ todo }: { todo: Todo }) =>
        setTodoList((prev) => prev.filter((item) => item.id !== todo.id)),
      )
      .catch((err) => console.error(err));
  };

  const removeAllTodo = async () => {
    await fetch(`/api/todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => setTodoList([]))
      .catch((err) => console.error(err));
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    const { todo } = await fetch(`/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: completed,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err)) as { todo: Todo };
    setTodoList((prev) =>
      prev.map((item) => {
        if (item.id === todo.id) item.isCompleted = todo.isCompleted;
        return item;
      }),
    );
  };

  return (
    <main className="mx-auto w-1/2">
      <h1 className="text-3xl">Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="flex justify-between">
        <h3 className="text-2xl">List</h3>
        <button
          className="rounded-md bg-red-500 p-2 text-white"
          onClick={() => {
            confirm("Are you sure, you want to remove all items ?") &&
              removeAllTodo().catch((err) => console.error(err));
          }}
        >
          Remove All Items
        </button>
      </div>

      <div className="h-[80vh] overflow-y-scroll">
        {todoList?.length ? (
          displayTodoList()
        ) : (
          <p className="mt-5 rounded-md bg-gray-100 p-3 text-center font-bold">
            Nothing to Show :)
          </p>
        )}
      </div>
    </main>
  );
}

const TodoItem = ({
  item,
  onChecked,
  onDelete,
}: {
  item: TodoItem;
  onChecked: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) => {
  return (
    <>
      <div className="flex items-center justify-between border rounded-md p-2 my-2">
          <h3 className={`${item.isCompleted && "line-through"} break-words w-96 font-bold ml-3`}>
            {item.title}
          </h3>
        <div className="flex space-x-2">
        <button
            className="rounded-md bg-green-500 p-2 text-white"
            onClick={() => {
              onChecked(item.id, !item.isCompleted).catch((err) => console.error(err));
            }}
          >
            { item.isCompleted ? "Reset" : "Mark as Completed" }
          </button>
          <button
            className="rounded-md bg-red-500 p-2 text-white"
            onClick={() => {
              confirm("Are you sure, you want to remove this item ?") && onDelete(item.id).catch((err) => console.error(err));
            }}
          >
            Remove
          </button>
          
        </div>
      </div>
    </>
  );
};

const TodoForm = ({
  addTodo,
}: {
  addTodo: (title: string) => Promise<void>;
}) => {
  const [title, setTitle] = useState("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() !== "")
      addTodo(title.trim()).catch((err) => console.error(err));

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
          placeholder="Add Todo..."
          />
        <input type="submit" value="Add" className="bg-blue-500 p-1 rounded-md text-white px-5" />
          </div>
      </form>
    </>
  );
};
