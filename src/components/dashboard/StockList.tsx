// components/dashboard/StockList.tsx
'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchWatchlist, fetchStockQuote } from '@/lib/api';
import Link from 'next/link';

export function StockList() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStocks() {
      try {
        const watchlist = await fetchWatchlist();
        
        // Fetch quotes for each stock
        const stocksWithQuotes = await Promise.all(
          watchlist.map(async (stock) => {
            try {
              const quote = await fetchStockQuote(stock.symbol);
              return { ...stock, ...quote[0] };
            } catch (error) {
              console.error(`Error fetching quote for ${stock.symbol}:`, error);
              return stock;
            }
          })
        );
        
        setStocks(stocksWithQuotes);
      } catch (error) {
        console.error('Error loading watchlist:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStocks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800/50">
            <TableHead className="text-xs">Symbol</TableHead>
            <TableHead className="text-xs text-right">Price</TableHead>
            <TableHead className="text-xs text-right">Chg %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => {
            const change = stock.tngoLast ? stock.tngoLast - stock.prevClose : 0;
            const changePercent = stock.prevClose ? (change / stock.prevClose) * 100 : 0;
            const isPositive = change >= 0;
            
            return (
              <TableRow key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <TableCell className="py-2">
                  <Link href={`/stocks/${stock.symbol}`} className="font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-500">
                    {stock.symbol}
                  </Link>
                </TableCell>
                <TableCell className="text-right py-2 font-medium text-gray-900 dark:text-white">
                  ${stock.tngoLast?.toFixed(2) || 'N/A'}
                </TableCell>
                <TableCell className={`text-right py-2 font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                  <div className="flex items-center justify-end">
                    {isPositive ? 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg> : 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    }
                    {Math.abs(changePercent).toFixed(2)}%
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
