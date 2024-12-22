export interface Menu {
  id: number
  title: string
  path?: string
  newTab: boolean
  submenu?: Menu[]
  icon: React.ReactNode
  page: string
}
