"use client";
import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";
import { useState } from "react";
import TodoForm from "./TodoForm";

const TodoList = ({ todoList }: { todoList: Todo[] }) => {
  const [list, setList] = useState<Todo[]>(todoList);

  const displayTodoList = () =>
    list.map((todo) => (
      <TodoItem
        key={todo.id}
        item={todo}
        onChecked={toggleComplete}
        onDelete={removeTodo}
      />
    ));

  const removeTodo = async (id: number) => {
    try {
      const { todo }: { todo: Todo } = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setList((prev) => prev.filter((item) => item.id !== todo.id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    try {
      setList((prev) =>
        prev.map((item) => {
          if (item.id === id) item.isCompleted = completed;
          return item;
        })
      );

      await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: completed,
        }),
      });
    } catch (err) {
      console.error("err", err);
      setList((prev) =>
        prev.map((item) => {
          if (item.id === id) item.isCompleted = !completed;
          return item;
        })
      );
    }
  };

  const removeAllTodo = async () => {
    const tempList = [...list];
    try {
      setList([]);

      await fetch(`/api/todo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("error", error);
      setList(tempList);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const { todo }: { todo: Todo } = await fetch(`/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }).then((res) => res.json());

      setList((prev) => [...prev, todo]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
        {list?.length ? (
          displayTodoList()
        ) : (
          <p className="mt-5 rounded-md bg-gray-100 p-3 text-center font-bold">
            Nothing to Show :)
          </p>
        )}
      </div>
    </>
  );
};

export default TodoList;
