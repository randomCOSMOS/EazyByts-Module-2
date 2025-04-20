// components/dashboard/StockList.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchWatchlist, fetchStockQuote } from '@/lib/api';
import { WatchlistStock, StockQuote } from '@/types';
import Link from 'next/link';

export function StockList() {
  const [stocks, setStocks] = useState<Array<WatchlistStock & Partial<StockQuote>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStocks() {
      try {
        const watchlist = await fetchWatchlist();
        
        // Fetch quotes for each stock
        const stocksWithQuotes = await Promise.all(
          watchlist.map(async (stock: WatchlistStock) => {
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
    
    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(() => {
      loadStocks();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading watchlist...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Change %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock) => {
              const change = stock.tngoLast ? stock.tngoLast - stock.prevClose : 0;
              const changePercent = stock.prevClose ? (change / stock.prevClose) * 100 : 0;
              
              return (
                <TableRow key={stock.symbol}>
                  <TableCell>
                    <Link href={`/stocks/${stock.symbol}`} className="font-medium hover:underline">
                      {stock.symbol}
                    </Link>
                  </TableCell>
                  <TableCell>{stock.tngoLast?.toFixed(2) || 'N/A'}</TableCell>
                  <TableCell className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {change.toFixed(2)}
                  </TableCell>
                  <TableCell className={changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {changePercent.toFixed(2)}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
