import { prisma } from "@/lib/prisma"


export const GET = async () => {
  try {
    const stories = await prisma.story.findMany() || [];
    return Response.json({ stories }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();
    const story = await prisma.story.create({
      data: { name }
    });
    return Response.json({ story }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
