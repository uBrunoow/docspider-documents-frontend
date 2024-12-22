'use client'
import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Bolt, Download, Eye, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IDocuments } from '@/interfaces/docs/IDocuments'
import { format } from 'date-fns'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import ConfirmDocumentInactivation from './Modal/ConfirmDocumentInactivation'
dayjs.extend(customParseFormat)

export function DataTable({
  data,
  page,
  setPage,
  rowsPerPage,
  // setRowsPerPage,
}: {
  data: IDocuments[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<{ nuqspage: number }>>
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const router = useRouter()

  const handleNextPage = () => {
    if (data.length < rowsPerPage) return
    setPage({ nuqspage: page + 1 })
  }

  const handlePreviousPage = () => {
    if (page !== 1) {
      setPage({ nuqspage: page - 1 })
    }
  }

  const columns: ColumnDef<IDocuments>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'description',
      header: 'Descrição',
      cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'created_at',
      header: 'Criado em',
      cell: ({ row }) => (
        <div>{format(row.getValue('created_at'), 'dd/MM/yyyy HH:mm')}</div>
      ),
    },
    {
      accessorKey: 'updated_at',
      header: 'Atualizado em',
      cell: ({ row }) => (
        <div>{format(row.getValue('updated_at'), 'dd/MM/yyyy HH:mm')}</div>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="space-x-5">
          <Button
            onClick={() =>
              router.push(`/meus-documentos/view/${row.getValue('id')}`)
            }
            className=" rounded-sm bg-orange-500 px-3 font-bold  text-white hover:bg-orange-600"
          >
            <Eye size={18} />
          </Button>
          <Button
            onClick={() =>
              router.push(`/meus-documentos/${row.getValue('id')}`)
            }
            className=" rounded-sm bg-blue-500 px-3 font-bold  text-white hover:bg-blue-600"
          >
            <Bolt size={18} />
          </Button>
          <Link href={row.original.document ?? '#'} target="_blank">
            <Button className=" rounded-sm bg-green-500 px-3 font-bold text-white hover:bg-green-600">
              <Download size={18} />
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-sm bg-red-500 px-3 font-bold text-white hover:bg-red-600">
                <Trash size={18} />
              </Button>
            </DialogTrigger>
            <ConfirmDocumentInactivation
              description={row.original.description}
              title={row.original.title}
              id={String(row.original.id)}
            />
          </Dialog>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: 10 },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4"></div>
      <div className="bhistory rounded-md">
        <Table className="border">
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="h-[50px]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className={`text-center ${index % 2 === 0 ? 'bg-zinc-200/20' : ''} h-[50px]`}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[500px] text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        {/* <div>
          <p className="text-sm text-zinc-500">Mostrando página {page}</p>
        </div> */}
        <div className="flex space-x-2">
          {/* <Select
            onValueChange={(value) => {
              setRowsPerPage(Number(value))
              table?.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-[31px] w-[180px]">
              <SelectValue placeholder="Linhas por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Linhas</SelectLabel>
                {[10, 50, 100].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={handlePreviousPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/management/pets?nuqspage=${page}`}>
                  {page}
                </PaginationLink>
                {data.length >= rowsPerPage && (
                  <PaginationLink
                    href={`/management/pets?nuqspage=${page + 1}`}
                  >
                    {page + 1}
                  </PaginationLink>
                )}
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={handleNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
