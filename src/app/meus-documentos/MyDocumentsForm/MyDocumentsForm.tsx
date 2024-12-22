'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryState } from 'nuqs'
import { Filter, Plus, Search, WrapText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
const PetsSchema = z.object({
  search: z.string({
    required_error: 'Digite um termo para a busca.',
    invalid_type_error: 'O termo precisa ser uma string',
  }),
})

function MyDocumentsForm() {
  const [, setSearch] = useQueryState('search')

  const router = useRouter()

  const form = useForm<z.infer<typeof PetsSchema>>({
    resolver: zodResolver(PetsSchema),
  })

  function onSubmit(data: z.infer<typeof PetsSchema>) {
    if (data.search === '') {
      toast.info('Reiniciando dados de pesquisa')
    } else {
      toast.info('Buscando dados de pesquisa: ' + data.search)
    }
    setSearch(data.search)
  }

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Set initial state based on window size
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Ínicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/meus-documentos">
              Meus Documentos
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold">Meus Documentos</h1>

        <div className={isMobile ? 'w-full' : ''}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 flex w-full flex-col items-center justify-center gap-5 md:mt-0 md:flex-row"
            >
              <div className="flex w-full flex-row gap-2">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="h-[45px] w-full md:w-[500px]"
                          placeholder="Pesquise por um documento"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                  className="h-[45px] rounded-sm border bg-transparent px-3 shadow-sm hover:bg-transparent md:w-auto"
                >
                  <Search className="text-black dark:text-white" size={20} />
                </Button>
              </div>
              <Button
                type="button"
                onClick={() => router.push('/meus-documentos/create')}
                className="flex h-[45px] w-full flex-row gap-2 rounded-sm px-4 font-bold text-white shadow-sm md:w-auto"
              >
                <Plus size={25} />
                Novo Documento
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default MyDocumentsForm
