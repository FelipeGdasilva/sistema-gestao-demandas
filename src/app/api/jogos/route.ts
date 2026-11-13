import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jogos = await prisma.jogo.findMany();
    return NextResponse.json(jogos, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao buscar jogos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const novoJogo = await prisma.jogo.create({
      data: {
        titulo: body.titulo,
        plataforma: body.plataforma,
        precoDiaria: body.precoDiaria,
      },
    });
    return NextResponse.json(novoJogo, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao criar jogo' }, { status: 500 });
  }
  
}

