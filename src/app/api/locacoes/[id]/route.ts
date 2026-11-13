import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const locacaoId = Number(id);

    if (!locacaoId || isNaN(locacaoId)) {
      return NextResponse.json(
        { error: "ID da locação inválido." },
        { status: 400 }
      );
    }

    const locacao = await prisma.locacao.findUnique({
      where: { id: locacaoId },
      include: { jogo: true },
    });

    if (!locacao) {
      return NextResponse.json(
        { error: "Locação não encontrada." },
        { status: 404 }
      );
    }

    if (locacao.dataDevolucao) {
      return NextResponse.json(
        { error: "Esta locação já foi devolvida anteriormente." },
        { status: 400 }
      );
    }

    const dataAtual = new Date();

    const [locacaoAtualizada] = await prisma.$transaction([
      prisma.locacao.update({
        where: { id: locacaoId },
        data: {
          dataDevolucao: dataAtual,
        },
        include: {
          cliente: true,
          jogo: true,
        },
      }),
      prisma.jogo.update({
        where: { id: locacao.jogoId },
        data: { disponivel: true },
      }),
    ]);

    return NextResponse.json(locacaoAtualizada, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao processar devolução" },
      { status: 500 }
    );
  }
}