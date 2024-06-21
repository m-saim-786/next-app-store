import Stories from "@/components/todo/Stories";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  // const { stories } = await fetch(`${process.env.BASE_URL}/api/stories`,  { cache: 'no-cache' }).then(res => res.json());

  const stories = await prisma.story.findMany();
  return (
    <main className="mx-auto w-1/2">
      <h1 className="text-3xl">Stories</h1>
      <Stories stories={stories} />
    </main>
  );
}
