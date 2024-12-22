import React from 'react'
import CreateMyDocumentsForm from './CreateForm/CreateForm'

function MyDocumentsCreatePage() {
  return (
    <section className="w-full p-5">
      <div className="">
        <div className="flex flex-wrap justify-start">
          <CreateMyDocumentsForm />
        </div>
      </div>
    </section>
  )
}

export default MyDocumentsCreatePage
