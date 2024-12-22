import React from 'react'

function Loader() {
  return (
    <div className="absolute left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-primary text-4xl font-bold text-white">
      <div className="flex h-screen items-center justify-center">
        <div className="relative inline-flex">
          <div className="h-8 w-8 rounded-full bg-zinc-100"></div>
          <div className="absolute left-0 top-0 h-8 w-8 animate-ping rounded-full bg-zinc-100"></div>
          <div className="absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full bg-zinc-100"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
