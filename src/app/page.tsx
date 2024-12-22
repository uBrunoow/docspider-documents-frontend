import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Background from '@/public/undraw_my-files_yynz.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-full">
      <div className="h-screen bg-gradient-to-b from-transparent to-primary/10 p-5">
        <div className="">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Ínicio</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mt-32 flex flex-col items-center gap-5">
          <h1 className="max-w-[600px] text-center text-4xl font-semibold">
            Simplifique a sua gestão de documentos com a Docspider
          </h1>
          <p className="max-w-[600px] text-center">
            Organize, acesse e compartilhe com eficiência e segurança.
          </p>
          <Link href={'/meus-documentos'}>
            <Button className="rounded-full p-2 px-5 text-white">
              Comece agora
            </Button>
          </Link>
          <div className="">
            <Image width={700} height={700} src={Background} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
