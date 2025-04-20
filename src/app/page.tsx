// app/page.tsx
'use client';

import { StockList } from '@/components/dashboard/StockList';
import { StockChart } from '@/components/dashboard/StockChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Stock Market Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <StockChart initialSymbol={selectedStock} />
        </div>
        
        <div>
          <StockList />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>S&P 500: 5,234.18 (+0.42%)</p>
            <p>Dow Jones: 38,671.69 (+0.35%)</p>
            <p>NASDAQ: 16,498.24 (+0.58%)</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>TSLA: +8.24%</p>
            <p>NVDA: +3.17%</p>
            <p>META: +2.89%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>INTC: -2.15%</p>
            <p>PFE: -1.87%</p>
            <p>BAC: -1.32%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
