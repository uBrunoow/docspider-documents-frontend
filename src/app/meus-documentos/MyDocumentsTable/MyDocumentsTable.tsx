'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Table'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import Loader from '@/components/Loader/Loader'
import { findManyDocumetnsPaginated } from '@/services/docs/documents'
import { format } from 'date-fns'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Bolt, Download, Eye, Trash } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import ConfirmDocumentInactivation from '../Table/Modal/ConfirmDocumentInactivation'

function MyDocumentsTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [page, setPage] = useQueryStates(
    {
      nuqspage: parseAsInteger.withDefault(1),
    },
    {
      history: 'push',
    },
  )

  const { nuqspage } = page

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      '/docs/documents?page={}&page_size={}',
      nuqspage,
      rowsPerPage,
      search,
    ],
    queryFn: async () => {
      return await findManyDocumetnsPaginated(nuqspage, rowsPerPage, search)
    },
  })

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

  if (isError) {
    throw error
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    throw error
  }

  return (
    <>
      {isMobile ? (
        <div className="w-full">
          {data &&
            data.results.map((docs, index) => (
              <div
                key={index}
                className="flex h-full w-full flex-col gap-5 border p-5"
              >
                <div className="flex w-full flex-col items-center gap-2">
                  <iframe src={docs?.document} width="100%" height="100px" />
                </div>

                <div className="space-y-1">
                  <h1 className="text-md font-semibold">{docs.title}</h1>
                  <p className="">{docs.description}</p>
                </div>

                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-700">Criado em</p>
                    <p>{format(String(docs.created_at), 'dd/MM/yyyy')}</p>
                  </div>

                  <div>
                    <p className="text-sm text-zinc-700">Atualizado em</p>
                    <p>{format(String(docs.updated_at), 'dd/MM/yyyy')}</p>
                  </div>
                </div>

                <Separator />

                <div className="w-full">
                  <div className="flex w-full flex-row gap-2">
                    <Button
                      onClick={() =>
                        router.push(`/meus-documentos/view/${docs?.id}`)
                      }
                      className="w-full rounded-sm bg-orange-500 px-3 font-bold  text-white hover:bg-orange-600"
                    >
                      <Eye size={18} />
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/meus-documentos/${docs?.id}`)
                      }
                      className="w-full rounded-sm bg-blue-500 px-3 font-bold  text-white hover:bg-blue-600"
                    >
                      <Bolt size={18} />
                    </Button>

                    <Button className="w-full rounded-sm bg-green-500 px-3 font-bold text-white hover:bg-green-600">
                      <Link href={docs?.document ?? '#'} target="_blank">
                        <Download size={18} />
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full rounded-sm bg-red-500 px-3 font-bold text-white hover:bg-red-600">
                          <Trash size={18} />
                        </Button>
                      </DialogTrigger>
                      <ConfirmDocumentInactivation
                        description={docs?.description}
                        title={docs?.title}
                        id={String(docs?.id)}
                      />
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <DataTable
          data={data ? data.results : []}
          page={nuqspage}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </>
  )
}

export default MyDocumentsTable
