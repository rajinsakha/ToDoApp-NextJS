import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-Do-App',
  description: 'To-do-app allows you to add, view, edit, and delete tasks. You can easily manage all your daily tasks in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
        {children}
        </StoreProvider>
        </body>
    </html>
  )
}
