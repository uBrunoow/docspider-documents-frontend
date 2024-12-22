import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { ProvidersNotFoundError } from '@/errors/webapp'

interface SidebarContextProps {
  children: ReactNode
}

interface SidebarContextData {
  sidebar: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextData | undefined>(undefined)

const SidebarProvider: React.FC<SidebarContextProps> = ({ children }) => {
  const [sidebar, setSidebar] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebar(false)
      } else {
        setSidebar(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const openSidebar = () => setSidebar(true)
  const closeSidebar = () => setSidebar(false)

  return (
    <SidebarContext.Provider value={{ sidebar, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = (): SidebarContextData => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new ProvidersNotFoundError(
      'useSidebar deve ser usado dentro de um SidebarProvider',
    )
  }
  return context
}

export { SidebarProvider, useSidebar }
