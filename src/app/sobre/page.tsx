import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/docspider-removebg-preview.png'

const About = () => {
  return (
    <>
      <div className="p-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Ínicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/sobre">Sobre</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <footer className="flex flex-col items-center justify-center gap-5 border-t border-zinc-700/20 bg-white p-5 dark:bg-gray-dark">
        <div className="flex w-64 max-w-full items-center justify-center">
          <Link href="/" className="mb-8 inline-block">
            <Image
              src={Logo}
              alt="logo"
              className="w-full"
              width={140}
              height={30}
            />
          </Link>
        </div>
        <p className="max-w-[500px] text-center text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Esta é uma solução prática e econômica para Gerenciamento Eletrônico
          de Documentos, com interface web simples e amigável.
        </p>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
        <div className="flex items-center justify-between gap-2 py-8">
          <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
            Versão 1.0.0
          </p>
          <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
            Docspider Software © 2020 | Site por Docspider
          </p>
        </div>
      </footer>
    </>
  )
}

export default About
