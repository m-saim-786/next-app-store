import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const storyId = req.nextUrl.searchParams.get("storyId");

    if (!storyId)
      return NextResponse.json(
        { error: "No storyId provided" },
        { status: 400 }
      );

    return NextResponse.json(
      { todos: await prisma.todo.findMany({ where: { storyId: storyId } }) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(`Error: ${error.message}`, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const todo = await prisma.todo.create({
      data: { ...data, isCompleted: false },
    });
    return NextResponse.json({ todo }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(`Error: ${error.message}`, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const storyId = req.nextUrl.searchParams.get("storyId");
    if (!storyId)
      return NextResponse.json(
        { error: "No storyId provided" },
        { status: 400 }
      );
    await prisma.todo.deleteMany({ where: { storyId } });
    return NextResponse.json({ message: "Deleted All todos" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(`Error: ${error.message}`, { status: 500 });
  }
}
