'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/docspider-removebg-preview.png'
import { Menu, X } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'

const Header = () => {
  const { closeSidebar, openSidebar, sidebar } = useSidebar()

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center bg-primary px-5`}
      >
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="flex w-48 max-w-full flex-row items-center justify-start gap-7 px-4 xl:mr-12">
            {sidebar === true ? (
              <Menu onClick={closeSidebar} color="#fff" size={40} />
            ) : (
              <X onClick={openSidebar} color="#fff" size={40} />
            )}

            <Link href="/" className={`header-logo block w-[100px]`}>
              <Image
                src={Logo}
                alt="logo"
                width={1000}
                height={1000}
                className="w-full"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
