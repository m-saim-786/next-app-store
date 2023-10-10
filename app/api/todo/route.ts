import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  return NextResponse.json({ todos: await prisma.todo.findMany() }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const todo = await prisma.todo.create({
    data: { ...data, isCompleted: false },
  });
  return NextResponse.json({ todo }, { status: 200 })
}

export async function DELETE(_req: NextRequest) {
  await prisma.todo.deleteMany();
  return NextResponse.json({ message: "Deleted All todos" } , { status: 200 })
}
