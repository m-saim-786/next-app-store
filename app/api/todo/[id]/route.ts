import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();

  if (!params.id)
    return NextResponse.json({ error: "Id not found" }, { status: 404 })

  try {
    const todo = await prisma.todo.update({ where: { id: +params.id }, data: data });
    return NextResponse.json({ todo }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!params.id)
    return NextResponse.json({ error: "Id not found" }, { status: 404 })

  try {
    const todo = await prisma.todo.delete({ where: { id: +params.id } });
    return NextResponse.json({ todo }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
