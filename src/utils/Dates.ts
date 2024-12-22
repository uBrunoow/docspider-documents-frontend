import { format } from 'date-fns'

export const formatDate = (
  dateStr: string | Date | null,
  formatType: {
    isNormalDate?: boolean
    isDateWithTime?: boolean
    isDatabseDate?: boolean
  },
) => {
  if (dateStr === null) return

  let formattedDate: string

  if (formatType.isNormalDate && formatType.isNormalDate === true)
    formattedDate = format(dateStr, 'dd/MM/yyyy')
  if (formatType.isDateWithTime && formatType.isDateWithTime === true)
    formattedDate = format(dateStr, 'dd/MM/yyyy HH:mm')
  if (formatType.isDatabseDate && formatType.isDatabseDate === true)
    formattedDate = format(dateStr, 'yyyy-MM-dd HH:mm:ss')

  return formattedDate
}
