import TodoList from "@/components/todo/TodoList";

export default async function Page() {
  const { todos } = await fetch(`${process.env.BASE_URL}/api/todo`,  { cache: 'no-cache' }).then(res => res.json());

  return (
    <main className="mx-auto w-1/2">
      <h1 className="text-3xl">Todo App</h1>
      <TodoList todoList={todos} />
    </main>
  );
}
