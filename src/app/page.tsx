'use client';

import { useState, useEffect } from 'react';

interface Demanda {
  id: number;
  titulo: string;
  descricao: string;
  dataSolicitacao: string;
  setor: string;
  status: string;
  prioridade: string;
}

export default function GestaoDemandas() {
  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [setor, setSetor] = useState('');
  const [status, setStatus] = useState('Aberta');
  const [dataSolicitacao, setDataSolicitacao] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  
  async function carregarDemandas() {
    try {
      const res = await fetch('/api/demandas');
      if (res.ok) {
        const data = await res.json();
        setDemandas(data);
      }
    } catch (err) {
      console.error('Erro ao carregar demandas:', err);
    }
  }

  useEffect(() => {
    carregarDemandas();
  }, []);


  async function handleSubmit(e: any) {
    e.preventDefault();
    setErro('');

    if (!titulo.trim() || !descricao.trim() || !setor.trim() || !status.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setCarregando(true);
    try {
      const res = await fetch('/api/demandas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          setor,
          status,
          dataSolicitacao,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || 'Erro ao cadastrar demanda.');
      } else {
        setTitulo('');
        setDescricao('');
        setSetor('');
        setStatus('Aberta');
        carregarDemandas();
      }
    } catch {
      setErro('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  }

  
  const totalDemandas = demandas.length;
  const totalAlta = demandas.filter((d) => d.prioridade === 'Alta').length;
  const totalNormal = demandas.filter((d) => d.prioridade === 'Normal').length;

  const porStatus = demandas.reduce<Record<string, number>>((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});

  const porSetor = demandas.reduce<Record<string, number>>((acc, d) => {
    acc[d.setor] = (acc[d.setor] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-8">
        
        <header className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Sistema de Gestão de Demandas Internas
          </h1>
          <p className="text-sm text-slate-500">
            Cadastro e acompanhamento com classificação automática de prioridade
          </p>
        </header>

      
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-blue-600">
            <p className="text-xs font-semibold uppercase text-slate-400">Total de Demandas</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">{totalDemandas}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-red-500">
            <p className="text-xs font-semibold uppercase text-slate-400">Por Prioridade</p>
            <p className="mt-1 text-sm font-medium">
              <span className="font-bold text-red-600">Alta: {totalAlta}</span> |{' '}
              <span className="font-bold text-emerald-600">Normal: {totalNormal}</span>
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-amber-500">
            <p className="text-xs font-semibold uppercase text-slate-400">Por Status</p>
            <div className="mt-1 text-xs space-y-0.5">
              {Object.entries(porStatus).length === 0 ? (
                <span className="text-slate-400">Sem dados</span>
              ) : (
                Object.entries(porStatus).map(([k, v]) => (
                  <div key={k}>
                    <strong>{k}:</strong> {v}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs font-semibold uppercase text-slate-400">Por Setor</p>
            <div className="mt-1 text-xs space-y-0.5">
              {Object.entries(porSetor).length === 0 ? (
                <span className="text-slate-400">Sem dados</span>
              ) : (
                Object.entries(porSetor).map(([k, v]) => (
                  <div key={k}>
                    <strong>{k}:</strong> {v}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Nova Demanda</h2>

          {erro && (
            <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Título *</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Falha no sistema de relatórios"
                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Setor *</label>
              <input
                type="text"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                placeholder="Ex: Financeiro, TI, RH..."
                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Data de Solicitação *
              </label>
              <input
                type="date"
                value={dataSolicitacao}
                onChange={(e) => setDataSolicitacao(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="Aberta">Aberta</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluída">Concluída</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Descrição *{' '}
                <span className="text-xs font-normal text-slate-400">
                  (Se contiver &quot;urgente&quot; ou &quot;erro&quot;, a prioridade será Alta automaticamente)
                </span>
              </label>
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva os detalhes da demanda..."
                className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={carregando}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {carregando ? 'Salvando...' : 'Cadastrar Demanda'}
              </button>
            </div>
          </form>
        </section>

        
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Demandas Cadastradas</h2>

          {demandas.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma demanda cadastrada até o momento.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="p-3">Título</th>
                    <th className="p-3">Setor</th>
                    <th className="p-3">Data</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Prioridade</th>
                    <th className="p-3">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {demandas.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">{d.titulo}</td>
                      <td className="p-3">{d.setor}</td>
                      <td className="p-3">
                        {new Date(d.dataSolicitacao).toLocaleDateString('pt-BR', {
                          timeZone: 'UTC',
                        })}
                      </td>
                      <td className="p-3">{d.status}</td>
                      <td className="p-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            d.prioridade === 'Alta'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {d.prioridade}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">{d.descricao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}