// app/portfolio/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock portfolio data
const portfolioData = [
  { symbol: 'AAPL', shares: 10, avgPrice: 196.98, currentPrice: 196.98, value: 1969.80 },
  { symbol: 'MSFT', shares: 5, avgPrice: 367.78, currentPrice: 367.78, value: 1838.90 },
  { symbol: 'GOOGL', shares: 8, avgPrice: 151.16, currentPrice: 151.16, value: 1209.28 },
  { symbol: 'AMZN', shares: 12, avgPrice: 172.61, currentPrice: 172.61, value: 2071.32 },
];

// Mock performance data
const performanceData = [
  { date: '2025-01-20', value: 6500 },
  { date: '2025-02-01', value: 6800 },
  { date: '2025-02-15', value: 6600 },
  { date: '2025-03-01', value: 7200 },
  { date: '2025-03-15', value: 7100 },
  { date: '2025-04-01', value: 7500 },
  { date: '2025-04-20', value: 7089 },
];

export default function PortfolioPage() {
  const totalValue = portfolioData.reduce((sum, stock) => sum + stock.value, 0);
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Day Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$89.32 (+1.27%)</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$589.32 (+8.32%)</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Number of Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.shares} shares</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.value.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        {((stock.value / totalValue) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Gain/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioData.map((stock) => {
                const gainLoss = stock.currentPrice - stock.avgPrice;
                const gainLossPercent = (gainLoss / stock.avgPrice) * 100;
                
                return (
                  <TableRow key={stock.symbol}>
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.shares}</TableCell>
                    <TableCell>${stock.avgPrice.toFixed(2)}</TableCell>
                    <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>${stock.value.toFixed(2)}</TableCell>
                    <TableCell className={gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {gainLoss >= 0 ? '+' : ''}${(gainLoss * stock.shares).toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
