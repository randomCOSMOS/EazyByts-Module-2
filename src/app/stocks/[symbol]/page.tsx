// app/stocks/[symbol]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { StockChart } from '@/components/dashboard/StockChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchStockQuote } from '@/lib/api';
import { toast } from 'sonner';

export default function StockDetailPage({ params }) {
  const { symbol } = params;
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shares, setShares] = useState(1);

  useEffect(() => {
    async function loadStockData() {
      try {
        const quoteData = await fetchStockQuote(symbol);
        setQuote(quoteData[0]);
      } catch (error) {
        console.error(`Error loading data for ${symbol}:`, error);
        toast.error(`Failed to load data for ${symbol}`);
      } finally {
        setLoading(false);
      }
    }
    
    loadStockData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-red-800 dark:text-red-400">Stock data not available</h2>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">We couldn't retrieve the data for {symbol}. Please try again later.</p>
        </div>
      </div>
    );
  }

  const change = quote.tngoLast - quote.prevClose;
  const changePercent = (change / quote.prevClose) * 100;
  const isPositive = change >= 0;

  const handleBuy = () => {
    toast.success(`Order placed: Bought ${shares} shares of ${symbol} at $${quote.tngoLast.toFixed(2)}`);
  };

  const handleSell = () => {
    toast.success(`Order placed: Sold ${shares} shares of ${symbol} at $${quote.tngoLast.toFixed(2)}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{symbol}</h1>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-semibold text-gray-900 dark:text-white mr-3">${quote.tngoLast.toFixed(2)}</span>
              <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                {isPositive ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                }
                <span>{isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated: {new Date(quote.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Price History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockChart initialSymbol={symbol} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Stock Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Open</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">${quote.open.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Previous Close</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">${quote.prevClose.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Day's Range</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">${quote.low.toFixed(2)} - ${quote.high.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">{quote.volume.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Trading Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Shares:</p>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      value={shares} 
                      onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-20 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total: <span className="font-medium text-gray-900 dark:text-white">${(shares * quote.tngoLast).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={handleBuy} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Buy
                  </Button>
                  <Button onClick={handleSell} className="bg-red-600 hover:bg-red-700 text-white">
                    Sell
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add to Watchlist</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
