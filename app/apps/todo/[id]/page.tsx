import TodoList from "@/components/todo/TodoList";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: { id: string } }) {
  // const { todos } = await fetch(`${process.env.BASE_URL}/api/todos?storyId=${params.id}`,  { cache: 'no-cache' }).then(res => res.json());

  const todos = await prisma.todo.findMany({ where: { storyId: params.id } });

  return (
    <main className="mx-auto w-1/2">
      <h1 className="text-3xl">Todos</h1>
      <TodoList todoList={todos} storyId={params.id} />
    </main>
  );
}
