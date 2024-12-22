'use client'
import React, { useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import DropzoneComponent from '@/components/DropzoneImage/DropzoneImage'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useQuery } from '@tanstack/react-query'
import { findDocumentById } from '@/services/docs/documents'
import Loader from '@/components/Loader/Loader'

const CreatePetsSchema = z.object({
  title: z.string({
    required_error: 'Título é obrigatório.',
    invalid_type_error: 'Título precisa ser uma string',
  }),
  description: z.string({
    required_error: 'Descrição é obrigatório.',
    invalid_type_error: 'Descrição precisa ser uma string',
  }),
  document: z.string({
    required_error: 'Documento é obrigatório.',
    invalid_type_error: 'Documento precisa ser uma string',
  }),
  filename: z.string({
    required_error: 'Nome do arquivo é obrigatório.',
    invalid_type_error: 'Nome do arquivo precisa ser uma string',
  }),
})

function EditPetsForm({ params }: { params: { id: string } }) {
  const {
    data: documentsData,
    isLoading: documentsLoading,
    isError: documentsIsError,
    error: documentsError,
  } = useQuery({
    queryKey: ['/docs/documents/:id', params.id],
    queryFn: async () => {
      return await findDocumentById(params.id)
    },
  })

  if (documentsIsError) {
    throw documentsError
  }

  const form = useForm<z.infer<typeof CreatePetsSchema>>({
    resolver: zodResolver(CreatePetsSchema),
  })

  useEffect(() => {
    form.reset({
      description: documentsData?.description,
      title: documentsData?.title,
      filename: documentsData?.filename,
      document: documentsData?.document,
    })
  }, [documentsData, form])

  if (documentsLoading) {
    return <Loader />
  }

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
          <BreadcrumbItem>Ver</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col items-start justify-center space-y-5">
        <h1 className="text-2xl font-bold">Visualizando Documento</h1>

        <div className="w-full space-y-3">
          <h2 className="text-lg font-bold">Informações do Documento</h2>
          <Separator />
        </div>

        <div className="w-full">
          <Form {...form}>
            <form className="flex w-full flex-col items-start justify-center gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Título do documento</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="h-[45px] w-full"
                        placeholder="Digite o título do documento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled
                        className="h-[100px] resize-none"
                        placeholder="Digite a descrição do documento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full flex-col items-center gap-2">
                <iframe
                  src={documentsData?.document}
                  width="100%"
                  height="500px"
                />
              </div>

              <FormField
                control={form.control}
                name="filename"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome do arquivo</FormLabel>
                    <FormControl>
                      <Input
                        className="h-[45px] w-full"
                        placeholder="Digite o nome do arquivo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditPetsForm
