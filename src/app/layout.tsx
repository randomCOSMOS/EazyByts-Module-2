// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stock Market Dashboard',
  description: 'Monitor stocks, manage your portfolio, and analyze trading performance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-slate-800 text-white">
          <div className="container mx-auto py-4 px-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Stock Dashboard
              </Link>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/" className="hover:text-slate-300">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" className="hover:text-slate-300">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/watchlist" className="hover:text-slate-300">
                      Watchlist
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-slate-800 text-white py-6">
          <div className="container mx-auto px-6">
            <p className="text-center">
              © {new Date().getFullYear()} Stock Market Dashboard. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
