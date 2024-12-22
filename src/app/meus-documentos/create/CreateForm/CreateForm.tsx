'use client'
import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { AxiosError } from 'axios'
import { extractErrorMessages } from '@/utils/Errors'
import LoadingButton from '@/components/LoadingButton'
import DropzoneComponent from '@/components/DropzoneImage/DropzoneImage'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { urlToBase64 } from '@/utils/Base64'
import { IDocuments } from '@/interfaces/docs/IDocuments'
import { useRouter } from 'next/navigation'
import { CreateDocumentService } from '@/services/docs/documents'

const CreatePetsSchema = z.object({
  title: z
    .string({
      required_error: 'Título é obrigatório.',
      invalid_type_error: 'Título precisa ser uma string',
    })
    .max(100, 'Título precisa ter no máximo 100 caracteres.'),
  description: z
    .string({
      required_error: 'Descrição é obrigatório.',
      invalid_type_error: 'Descrição precisa ser uma string',
    })
    .max(2000, 'Descrição precisa ter no máximo 2000 caracteres.'),
  document: z.string({
    required_error: 'Documento é obrigatório.',
    invalid_type_error: 'Documento precisa ser uma string',
  }),
  filename: z.string({
    required_error: 'Nome do arquivo é obrigatório.',
    invalid_type_error: 'Nome do arquivo precisa ser uma string',
  }),
})

function CreatePetsForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CreatePetsSchema>>({
    resolver: zodResolver(CreatePetsSchema),
  })

  async function onSubmit(data: z.infer<typeof CreatePetsSchema>) {
    const documentBase64 = await urlToBase64(data.document)

    const formData: IDocuments = {
      description: data.description,
      title: data.title,
      document: documentBase64,
      filename: data.filename,
    }

    try {
      const response = await CreateDocumentService(formData)

      if (response && response.id) {
        toast.success('Documento cadastrado com sucesso.')
        form.reset()
        router.push('/meus-documentos')
      }
    } catch (error: unknown) {
      console.error(error)
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        const errorData = error.response.data
        const errorMessages = extractErrorMessages(errorData)
        toast.error('Erro ao cadastrar o documento: ' + errorMessages)
      } else if (error instanceof Error) {
        toast.error('Erro ao cadastrar o documento: ' + error.message)
      } else {
        toast.error('Erro ao cadastrar o documento: Erro desconhecido.')
      }
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
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
          <BreadcrumbItem>Criar</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col items-start justify-center space-y-5">
        <h1 className="text-2xl font-bold">Criar Documento</h1>

        <div className="w-full space-y-3">
          <h2 className="text-lg font-bold">Informações do Documento</h2>
          <Separator />
        </div>

        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-start justify-center gap-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Título do documento</FormLabel>
                    <FormControl>
                      <Input
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
                        className="h-[100px] resize-none"
                        placeholder="Digite a descrição do documento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DropzoneComponent
                form={form}
                name={'document'}
                label="Documento"
              />

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

              <LoadingButton
                isLoading={isLoading}
                className="flex h-[45px] flex-row gap-2 font-bold text-white"
              >
                <PlusCircle size={20} />
                Cadastrar novo Documento
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CreatePetsForm
