'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider } from '@/contexts/SidebarContext'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>{children}</SidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
