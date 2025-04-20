// app/stocks/[symbol]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { StockChart } from '@/components/dashboard/StockChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchStockQuote } from '@/lib/api';
import { StockQuote } from '@/types';

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [shares, setShares] = useState(1);

  useEffect(() => {
    async function loadStockData() {
      try {
        const quoteData = await fetchStockQuote(symbol);
        setQuote(quoteData[0]);
      } catch (error) {
        console.error(`Error loading data for ${symbol}:`, error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStockData();
    
    // Set up interval to refresh data
    const intervalId = setInterval(() => {
      loadStockData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [symbol]);

  if (loading) {
    return <div className="container mx-auto py-6">Loading stock data...</div>;
  }

  if (!quote) {
    return <div className="container mx-auto py-6">Stock data not available</div>;
  }

  const change = quote.tngoLast - quote.prevClose;
  const changePercent = (change / quote.prevClose) * 100;

  const handleBuy = () => {
    alert(`Buy ${shares} shares of ${symbol} at $${quote.tngoLast.toFixed(2)}`);
  };

  const handleSell = () => {
    alert(`Sell ${shares} shares of ${symbol} at $${quote.tngoLast.toFixed(2)}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{symbol}</h1>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-semibold mr-3">${quote.tngoLast.toFixed(2)}</span>
            <span className={`text-lg ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <StockChart initialSymbol={symbol} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Stock Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Open</p>
                <p className="font-medium">${quote.open.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Previous Close</p>
                <p className="font-medium">${quote.prevClose.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Day's Range</p>
                <p className="font-medium">${quote.low.toFixed(2)} - ${quote.high.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Volume</p>
                <p className="font-medium">{quote.volume.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">Shares:</p>
                <Input 
                  type="number" 
                  value={shares} 
                  onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-20"
                />
                <p className="text-sm text-gray-500">
                  Total: ${(shares * quote.tngoLast).toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleBuy} className="bg-green-600 hover:bg-green-700">
                  Buy
                </Button>
                <Button onClick={handleSell} className="bg-red-600 hover:bg-red-700">
                  Sell
                </Button>
              </div>
              <div>
                <p className="text-sm text-gray-500">Add to Watchlist</p>
                <Button className="mt-1 bg-blue-600 hover:bg-blue-700 w-full">
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
