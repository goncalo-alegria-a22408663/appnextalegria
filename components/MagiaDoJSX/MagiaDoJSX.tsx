export default function MagiaDoJSX() {

    const magia = <strong>HTML dentro de JavaScript!</strong>
    const tecnologias = "React e Next.js"

    return (
        <div className='bg-blue-300 p-3 m-3 rounded-xl'>
        <p>Este é o meu componente MagiaDoJSX.</p>
        <p> Um componente é um funçáo que retorna JSX - {magia}</p>
        <p>Os componentes são usados em {tecnologias}</p>
        </div>
    
    )
}