import { IDocuments } from '@/interfaces/docs/IDocuments'
import { get, patch, post } from '@/providers/api'
import { ErrorHandling } from '@/utils/Errors'

export const findManyDocumetnsPaginated = async (
  page?: number,
  pageSize?: number,
  globalSearch?: string,
): Promise<{ count: number; results: IDocuments[] } | undefined> => {
  try {
    let url = `docs/documents`

    if (globalSearch) {
      url += `?search=${globalSearch}`
    } else {
      url += `?page=${page}&page_size=${pageSize}&is_active=${true}`
    }

    const result = await get(url)
    return result as Promise<{
      count: number
      results: IDocuments[]
    }>
  } catch (error: unknown) {
    ErrorHandling(error)
  }
}

export const findDocumentById = async (
  id: string,
): Promise<IDocuments | undefined> => {
  try {
    const response = await get(`docs/documents/${id}`)
    return response as Promise<IDocuments>
  } catch (error: unknown) {
    ErrorHandling(error)
  }
}

export const CreateDocumentService = async (
  data: IDocuments,
): Promise<IDocuments | undefined> => {
  try {
    const body = {
      ...data,
    }

    const response = await post('docs/documents/', { body })
    return response as Promise<IDocuments>
  } catch (error: unknown) {
    ErrorHandling(error)
  }
}

export const UpdateDocumentService = async (
  data: IDocuments,
  id: string,
): Promise<IDocuments | undefined> => {
  try {
    const body = {
      ...data,
    }

    const response = await patch(`docs/documents/${id}/`, { body })
    return response as Promise<IDocuments>
  } catch (error: unknown) {
    ErrorHandling(error)
  }
}

export const InactivateDocumentService = async (id: string) => {
  try {
    const body = {
      is_active: false,
    }

    const response = await patch(`docs/documents/${id}/`, { body })
    return response
  } catch (error: unknown) {
    ErrorHandling(error)
  }
}
