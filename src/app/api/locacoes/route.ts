import { NextResponse } from 'next/server';
import { listarLocacoesService, criarLocacaoService } from '@/services/locacao.service';

export async function GET() {
  try {
    const locacoes = await listarLocacoesService();
    return NextResponse.json(locacoes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao buscar locações.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clienteId = Number(body.clienteId);
    const jogoId = Number(body.jogoId);

    const locacao = await criarLocacaoService(clienteId, jogoId);
    return NextResponse.json(locacao, { status: 201 });
  } catch (error) {
    console.log(error);
    const mensagem = error instanceof Error ? error.message : 'Erro ao processar requisição.';
    return NextResponse.json({ error: mensagem }, { status: 400 });
  }
}