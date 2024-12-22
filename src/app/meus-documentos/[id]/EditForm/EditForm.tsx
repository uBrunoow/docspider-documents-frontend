'use client'
import React, { useEffect, useState } from 'react'
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
import { CheckCircle, Download, Trash } from 'lucide-react'
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
import { applyWeightMask } from '@/utils/Masks'
import { useQuery } from '@tanstack/react-query'
import {
  findDocumentById,
  UpdateDocumentService,
} from '@/services/docs/documents'
import Loader from '@/components/Loader/Loader'
import { IDocuments } from '@/interfaces/docs/IDocuments'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import ConfirmDocumentInactivation from '../../Table/Modal/ConfirmDocumentInactivation'

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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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

  async function onSubmit(data: z.infer<typeof CreatePetsSchema>) {
    const documentBase64 = await urlToBase64(data.document)

    const formData: IDocuments = {
      description: data.description,
      document: documentBase64,
      filename: data.filename,
      title: data.title,
    }

    try {
      const response = await UpdateDocumentService(formData, params.id)

      if (response && response.id) {
        toast.success('Documento editado com sucesso.')
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
        toast.error('Erro ao cadastrar o pet: ' + errorMessages)
      } else if (error instanceof Error) {
        toast.error('Erro ao cadastrar o pet: ' + error.message)
      } else {
        toast.error('Erro ao cadastrar o pet: Erro desconhecido.')
      }
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

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
          <BreadcrumbItem>Editar</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col items-start justify-center space-y-5">
        <h1 className="text-2xl font-bold">Editar Documento</h1>

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
                initialImage={documentsData?.document}
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

              <div className="flex flex-col gap-5 md:flex-row">
                <LoadingButton
                  isLoading={isLoading}
                  className="flex h-[45px] w-full flex-row gap-2 font-bold text-white md:w-auto"
                >
                  <CheckCircle size={20} />
                  Salvar aletrações
                </LoadingButton>

                <Link href={documentsData?.document ?? '#'} target="_blank">
                  <Button
                    type="button"
                    className=" h-[45px] w-full flex-row gap-2 bg-green-500 px-3 font-bold text-white hover:bg-green-600 md:w-auto"
                  >
                    <Download size={18} />
                    Fazer download
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="h-[45px] w-full flex-row gap-2 bg-red-500 px-3 font-bold text-white hover:bg-red-600 md:w-auto"
                    >
                      <Trash size={18} />
                      Excluir arquivo
                    </Button>
                  </DialogTrigger>
                  <ConfirmDocumentInactivation
                    description={documentsData?.description as string}
                    title={documentsData?.title as string}
                    id={String(documentsData?.id)}
                  />
                </Dialog>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditPetsForm
