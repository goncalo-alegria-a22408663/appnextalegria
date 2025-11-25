import MagiaDoJSX from "@/components/MagiaDoJSX/MagiaDoJSX"
import Link from "next/link"

export default function page() {

  return (
    <div>
      <header className="flex flex-col items-center">
        <h1>React & Next.js</h1>
        <nav className="flex gap-4">
          <Link href="/">Intro</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/caracteristicas">Características</Link>
          <Link href="/tecnologias">Tecnologias</Link>
          <Link href="/projetos">Projetos</Link>

        </nav>
      </header>
      <h2>Interfaces Modernos</h2>
      <p>Bem vindo à minha App em React e Next.js</p>
      <MagiaDoJSX/>
    </div>
  )
}
