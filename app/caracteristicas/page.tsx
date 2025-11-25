
"use client";
export default function CaracteristicasPage() {

  const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
  ];

  function teste() {
    alert('Clicou nas características!');
  }

  return (

    <div >
      <h2>Características do React e Next.js</h2>
      <ul>
        {caracteristicas.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={teste}>Clique Aqui</button>
    </div>
  );
};
