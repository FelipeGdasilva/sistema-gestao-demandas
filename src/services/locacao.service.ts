import { prisma } from '@/lib/prisma';


export async function listarLocacoesService() {
  return await prisma.locacao.findMany({
    include: {
      cliente: true,
      jogo: true,
    },
  });
}

export async function criarLocacaoService(clienteId: number, jogoId: number) {
  if (!clienteId || !jogoId) {
    throw new Error('CLIENTE_JOGO_OBRIGATORIOS');
  }

  const jogo = await prisma.jogo.findUnique({ where: { id: jogoId } });

  if (!jogo) {
    throw new Error('JOGO_NAO_ENCONTRADO');
  }

  if (!jogo.disponivel) {
    throw new Error('JOGO_INDISPONIVEL');
  }

  const [novaLocacao] = await prisma.$transaction([
    prisma.locacao.create({
      data: { clienteId, jogoId },
      include: { cliente: true, jogo: true },
    }),
    prisma.jogo.update({
      where: { id: jogoId },
      data: { disponivel: false },
    }),
  ]);

  return novaLocacao;
}