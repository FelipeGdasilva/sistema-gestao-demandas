import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{
        const clientes = await prisma.cliente.findMany();
        return NextResponse.json(clientes, {status:200});
    }catch(error){
        console.log(error)
        return NextResponse.json({error: "Erro ao buscar clientes"}, {status:500});
    }
}

export async function  POST (request:NextRequest) {
    try{
    const body = await request.json();
    const {nome, email, telefone} = body;
    const novoCliente = await prisma.cliente.create({
        data: {nome, email, telefone},
    });

    return NextResponse.json(novoCliente, {status:201});
}catch(error){
    console.log(error)
    return NextResponse.json({error: "Erro ao cria cliente"}, {status: 500})
}
    
}