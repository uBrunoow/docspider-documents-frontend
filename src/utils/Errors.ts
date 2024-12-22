import { ApiGetDataError } from '@/errors/webapp'
import { AxiosError } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractErrorMessages(errorData: any): string {
  const messages: string[] = []
  for (const key in errorData) {
    if (Array.isArray(errorData[key])) {
      messages.push(`${key}: ${errorData[key].join(', ')}`)
    } else if (typeof errorData[key] === 'object') {
      messages.push(`${key}: { ${extractErrorMessages(errorData[key])} }`)
    }
  }
  return messages.join(' | ')
}

export function ErrorHandling(error: unknown) {
  if (error instanceof AxiosError && error.response && error.response.data) {
    const errorMessage = error.response?.data?.message || error.message
    const errorStatus = error.response?.status || 500
    const errorResponse = error.response.data

    throw new ApiGetDataError(errorMessage, errorStatus, errorResponse)
  }
}
