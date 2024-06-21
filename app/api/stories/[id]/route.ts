import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (!params.id)
    return Response.json({ error: "Id not found" }, { status: 404 });

  try {
    const story = await prisma.story.delete({ where: { id: params.id } });
    return Response.json({ story }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(`Error: ${error.message}`, { status: 400 });
  }
};
