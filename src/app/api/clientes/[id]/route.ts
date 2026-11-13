import { NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET (_request:NextRequest, {params}: {params:{id:string}}) {
    try{
        const id = Number(params.id);
        const cliente = await prisma.cliente.findUnique({
            where: {id},
        });
        if(!cliente){
            return NextResponse.json({error: "Cliente não encontrado"}, {status:404})
        }
        return NextResponse.json(cliente,{status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json( {erro: "Erro ao buscar cliente"}, {status:500})
    }
}

export async function  PUT(request:NextRequest, {params}: {params:{id:string}}) {
    try{
        const id = Number(params.id);
        const body = await request.json();
        const {nome, email, telefone} = body;
        const clienteAtualizado = await prisma.cliente.update({
            where: {id},
            data:{nome, email, telefone},
        });
        return NextResponse.json(clienteAtualizado, {status: 200});
    }catch (error){
        console.log(error);
        return NextResponse.json ({error: "Erro ao atualizar cliente"}, {status: 500})
    }
}

 export async function  DELETE (_request:NextRequest, {params}: {params:{id:string}}) {
    try{
        const id = Number(params.id);
        await prisma.cliente.delete({where:{id}});
        
        return NextResponse.json({message: "Cliente deletado com sucesso"}, {status:200});
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "Erro ao deletar cliente"}, {status:500})
    }
 }