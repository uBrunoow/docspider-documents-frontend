export async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
