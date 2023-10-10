import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import { prisma } from "@/lib/prisma";

export default async function Todo() {
  const todoList = await prisma.todo.findMany()

  return (
    <main className="mx-auto w-1/2">
      <h1 className="text-3xl">Todo App</h1>
      <TodoList todoList={todoList} />
    </main>
  );
}
