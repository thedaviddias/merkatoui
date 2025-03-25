import './global.css'
import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  fallback: ['sans-serif']
})

export const metadata = {
  title: {
    template: '%s | Merkato UI',
    default: 'Merkato UI'
  },
  description:
    'Merkato UI is a React component library that provides a set of reusable components for building web applications.',
  authors: [
    {
      name: 'Merkato',
      url: 'https://merkatoui.com'
    }
  ]
} satisfies Metadata

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <PlausibleProvider domain="merkatoui.com">
        <body className="flex flex-col min-h-screen">
          <RootProvider>
            {children}
            <Analytics mode="production" />
          </RootProvider>
        </body>
      </PlausibleProvider>
    </html>
  )
}
