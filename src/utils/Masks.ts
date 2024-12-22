export const applyCepMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2')
}

export const applyColorMask = (value: string) => {
  const sanitizedInput = value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6)
  return `#${sanitizedInput}`
}

export const applyPhoneMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export const applyCnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export const applyCpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}

export const applyMoneyMask = (value: string) => {
  const onlyNums = value.replace(/[^\d]/g, '')
  const paddedNums = onlyNums.padStart(3, '0')
  const formattedNumber = paddedNums.replace(/(\d+)(\d{2})$/, '$1,$2')
  const withoutLeadingZeros = formattedNumber.replace(/^0+(?=\d)/, '')
  const finalFormattedNumber = withoutLeadingZeros.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.',
  )

  return `R$${finalFormattedNumber}`
}

export const applyWeightMask = (value: string) => {
  const onlyNums = value.replace(/[^\d]/g, '')
  const paddedNums = onlyNums.padStart(3, '0')
  const formattedNumber = paddedNums.replace(/(\d+)(\d{3})$/, '$1,$2')
  const withoutLeadingZeros = formattedNumber.replace(/^0+(?=\d)/, '')
  const finalFormattedNumber = withoutLeadingZeros.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.',
  )

  return `${finalFormattedNumber} kg`
}

export const applyHourMask = (value: string) => {
  // Remover todos os caracteres não numéricos
  const onlyNums = value.replace(/[^\d]/g, '')

  // Limitar a string a no máximo 4 caracteres
  const limitedNums = onlyNums.slice(0, 4)

  // Inserir o caractere ':' entre as horas e os minutos
  const formattedHour = limitedNums.replace(/(\d{2})(\d{2})/, '$1:$2')

  return formattedHour
}

export const applyTimeMask = (value: string) => {
  return value
    .replace(/[^\d]/g, '') // Remove todos os caracteres que não são dígitos
    .slice(0, 6) // Limita a string a 6 caracteres
    .replace(/(\d{2})(\d)/, '$1:$2') // Adiciona o primeiro ':'
    .replace(/(\d{2}:\d{2})(\d)/, '$1:$2') // Adiciona o segundo ':'
}
export const applyDateMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
    .substring(0, 8) // Limita a string a 8 caracteres
    .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona a primeira '/'
    .replace(/(\d{2}\/\d{2})(\d)/, '$1/$2') // Adiciona a segunda '/'
}

export const applyNumbersMask = (value: string) => {
  return value.replace(/\D/g, '')
}
