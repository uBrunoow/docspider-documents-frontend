import React from 'react'
import MyDocumentsForm from './MyDocumentsForm/MyDocumentsForm'
import MyDocumentsTable from './MyDocumentsTable/MyDocumentsTable'

function MyDocuments() {
  return (
    <section className="w-full p-5">
      <div className="">
        <div className="flex flex-wrap justify-start">
          <MyDocumentsForm data-testid="MyDocumentsForm" />

          <div className="w-full">
            <div className="mt-2 flex flex-col items-center justify-between space-y-3 lg:mt-0 lg:flex-row">
              <MyDocumentsTable data-testid="MyDocumentsTable" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyDocuments
