'use client'

import React from 'react'
import { menuData } from './menuData'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'

const Sidebar = () => {
  const pathname = usePathname()
  const { sidebar } = useSidebar()

  return (
    <div
      className={`fixed h-screen md:relative ${sidebar ? 'w-[300px]' : 'w-auto'} border ${!sidebar ? 'hidden md:block' : ''} ${sidebar ? 'z-50 bg-white' : ''}`}
    >
      {menuData.map((item, index) => {
        return (
          <div
            key={index}
            className={`${pathname === (item.path as string) ? 'text-primary/90' : ''} flex w-full items-center justify-between border border-b px-5 hover:text-primary`}
          >
            <Link
              href={item.path ?? ''}
              className="flex w-full items-center justify-between gap-2 py-3"
            >
              {sidebar && item.title}
              {item.icon}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar
