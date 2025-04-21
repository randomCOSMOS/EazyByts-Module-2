// app/page.tsx
'use client';

import { StockList } from '@/components/dashboard/StockList';
import { StockChart } from '@/components/dashboard/StockChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Track your investments and market trends in real-time</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">S&P 500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5,234.18</div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>0.42%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Dow Jones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">38,671.69</div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>0.35%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">NASDAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">16,498.24</div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>0.58%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Open</div>
              <div className="flex items-center text-emerald-600 dark:text-emerald-500">
                <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                <span>Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-900 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <StockChart initialSymbol="AAPL" />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                </svg>
                Watchlist
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <StockList />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
              Market News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Fed Signals Potential Rate Cut in June</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Federal Reserve minutes indicate a possible shift in monetary policy...</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">2 hours ago</p>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Tech Stocks Rally on Strong Earnings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Major tech companies report better-than-expected Q1 results...</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">5 hours ago</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Oil Prices Stabilize After Recent Volatility</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Global oil markets find equilibrium following supply concerns...</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">8 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">TSLA</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tesla, Inc.</div>
                </div>
                <div className="text-emerald-600 dark:text-emerald-500 font-medium">+8.24%</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">NVDA</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">NVIDIA Corporation</div>
                </div>
                <div className="text-emerald-600 dark:text-emerald-500 font-medium">+3.17%</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">META</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Meta Platforms, Inc.</div>
                </div>
                <div className="text-emerald-600 dark:text-emerald-500 font-medium">+2.89%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">INTC</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Intel Corporation</div>
                </div>
                <div className="text-red-600 dark:text-red-500 font-medium">-2.15%</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">PFE</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pfizer Inc.</div>
                </div>
                <div className="text-red-600 dark:text-red-500 font-medium">-1.87%</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">BAC</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bank of America Corp</div>
                </div>
                <div className="text-red-600 dark:text-red-500 font-medium">-1.32%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
