import React from 'react'
import EditPetsForm from './EditForm/EditForm'
import { IDocuments } from '@/interfaces/docs/IDocuments'

function PetsEditPage({ params }: { params: { id: string } }) {
  return (
    <section className="w-full p-5">
      <div className="">
        <div className="flex flex-wrap justify-start">
          <EditPetsForm params={params} />
        </div>
      </div>
    </section>
  )
}

export default PetsEditPage

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/docs/documents`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch documents: ${response.statusText}`)
    }

    const pets: { count: number; results: IDocuments[] } = await response.json()

    return pets.results.map((pet) => ({
      id: String(pet.id),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
