// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finaro | Modern Market Dashboard',
  description: 'Monitor stocks, manage your portfolio, and analyze trading performance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <Toaster position="top-right" />
        <div className="flex h-full flex-col">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-6-6-6 6" />
                    <path d="M6 10l4-1 2 2 4-1" />
                  </svg>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Finaro</span>
                </Link>
                <nav className="hidden md:block">
                  <ul className="flex space-x-8">
                    <li>
                      <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 font-medium">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 font-medium">
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href="/watchlist" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 font-medium">
                        Watchlist
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="flex items-center space-x-4">
                  <button className="rounded-full bg-gray-200 dark:bg-gray-700 p-1" aria-label="Toggle dark mode">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 py-6">{children}</main>
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} StockVue. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
