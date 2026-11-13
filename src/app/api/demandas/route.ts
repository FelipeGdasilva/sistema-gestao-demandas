import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    const demandas = await prisma.demanda.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(demandas, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar demandas:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar demandas.' },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, descricao, setor, status, dataSolicitacao } = body;

    
    if (!titulo?.trim() || !descricao?.trim() || !setor?.trim() || !status?.trim()) {
      return NextResponse.json(
        { error: 'Os campos Título, Descrição, Setor e Status são obrigatórios.' },
        { status: 400 }
      );
    }

    
    const descricaoNormalizada = descricao.toLowerCase();
    const prioridade =
      descricaoNormalizada.includes('urgente') || descricaoNormalizada.includes('erro')
        ? 'Alta'
        : 'Normal';

    
    const novaDemanda = await prisma.demanda.create({
      data: {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        setor: setor.trim(),
        status: status.trim(),
        prioridade,
        ...(dataSolicitacao && { dataSolicitacao: new Date(dataSolicitacao) }),
      },
    });

    return NextResponse.json(novaDemanda, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar demanda:', error);
    return NextResponse.json(
      { error: 'Erro interno ao cadastrar demanda.' },
      { status: 500 }
    );
  }
}