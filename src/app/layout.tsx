import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'KontenToko AI — 4-in-1 Content Machine untuk Seller TikTok',
  description: 'Generate hook, script, caption, dan content calendar TikTok otomatis dengan AI',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin:0, padding:0 }}>{children}</body>
    </html>
  )
}