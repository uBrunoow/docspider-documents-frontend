import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Textarea } from '@/components/ui/textarea'
import { InactivateDocumentService } from '@/services/docs/documents'

function ConfirmDocumentInactivation({
  title,
  description,
  id,
}: {
  title: string
  description: string
  id: string
}) {
  const usePatchUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: () => InactivateDocumentService(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['/docs/documents?page={}&page_size={}'],
        })
      },
    })
  }

  const mutation = usePatchUser()

  const handleConfirm = () => {
    mutation.mutate()
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Inativação de documento</DialogTitle>
        <DialogDescription>
          Concordando com a inativação do documento ele não aparecerá mais ao
          sistema.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Título</Label>
          <Input value={title} disabled />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea value={description} disabled />
        </div>
      </div>

      <DialogFooter className="flex flex-row justify-center gap-5">
        <DialogClose className="w-full">
          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600"
            type="submit"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          onClick={handleConfirm}
          className="w-full text-white"
          type="button"
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default ConfirmDocumentInactivation
