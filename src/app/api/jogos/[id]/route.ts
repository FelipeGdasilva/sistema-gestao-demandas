import { NextResponse ,  NextRequest} from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT (request:NextRequest,
     {params}: {params: {id:string}}
) {
    try{
        const id= Number(params.id);
        const body = await request.json();
        const{titulo, plataforma, precoDiaria, disponivel} = body;
        const jogoAtualizado = await prisma.jogo.update({
            where: {id},
            data: {titulo, plataforma, precoDiaria, disponivel}
        });
        return NextResponse.json(jogoAtualizado, {status: 200});
    }catch(error){
        console.log(error)
        return NextResponse.json({error: "Erro ao atualizar jogo"},{status:500})
    }
}

export async function DELETE(_request:NextRequest, {params}: {params:{id: string}}) {
    try{
        const id = Number(params.id);
        await prisma.jogo.delete({where:{ id }});

        return NextResponse.json({message: "Jogo deletado com sucesso"}, {status: 200});
    }catch(error){
        console.log(error)
        return NextResponse.json({error: "Erro ao deletar jogo"}, {status:500});
    }
}