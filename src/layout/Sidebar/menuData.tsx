import { Menu } from '@/interfaces/menu'
import { Files, Home, Info } from 'lucide-react'

export const menuData: Menu[] = [
  {
    id: 1,
    title: 'Ínicio',
    newTab: false,
    path: '/',
    icon: <Home />,
    page: '',
  },
  {
    id: 1,
    title: 'Meus documentos',
    newTab: false,
    path: '/meus-documentos',
    icon: <Files />,
    page: 'meus-documentos',
  },
  {
    id: 1,
    title: 'Sobre',
    newTab: false,
    path: '/sobre',
    icon: <Info />,
    page: 'sobre',
  },
]
