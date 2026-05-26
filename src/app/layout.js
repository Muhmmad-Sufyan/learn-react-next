import { Inter, Outfit, Fira_Code } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata = {
  title: {
    template: '%s | React & Next.js Masterclass',
    default: 'React & Next.js Masterclass — Learn by Doing',
  },
  description:
    'Master React and Next.js from fundamentals to advanced concepts. Interactive lessons, code examples, and quizzes built for deep understanding.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${firaCode.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
