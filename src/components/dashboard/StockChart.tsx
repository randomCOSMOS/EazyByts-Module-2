// components/dashboard/StockChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { fetchHistoricalData, fetchWatchlist } from '@/lib/api';

export function StockChart({ initialSymbol = 'AAPL' }) {
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('area');
  const [timeframe, setTimeframe] = useState('1m');
  const [availableStocks, setAvailableStocks] = useState([]);

  // Fetch available stocks for the dropdown
  useEffect(() => {
    async function loadWatchlist() {
      try {
        const watchlist = await fetchWatchlist();
        setAvailableStocks(watchlist);
      } catch (error) {
        console.error('Error loading watchlist:', error);
      }
    }
    
    loadWatchlist();
  }, []);

  // Load historical data when selected symbol changes
  useEffect(() => {
    async function loadHistoricalData() {
      setLoading(true);
      try {
        const historicalData = await fetchHistoricalData(selectedSymbol);
        
        // Process data based on timeframe
        const processedData = processChartData(historicalData, timeframe);
        setData(processedData);
      } catch (error) {
        console.error(`Error loading chart data for ${selectedSymbol}:`, error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHistoricalData();
  }, [selectedSymbol, timeframe]);

  function processChartData(data, timeframe) {
    // Filter data based on timeframe
    const now = new Date("2025-04-20");
    const timeframeMap = {
      '1w': 7,
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365,
      'all': Infinity
    };
    
    const daysToInclude = timeframeMap[timeframe];
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - daysToInclude);
    
    return data
      .filter(item => new Date(item.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        date: new Date(item.date).toISOString().split('T')[0],
        value: item.close
      }));
  }

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1w">1 Week</SelectItem>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Select stock" />
          </SelectTrigger>
          <SelectContent>
            {availableStocks.map((stock) => (
              <SelectItem key={stock.symbol} value={stock.symbol}>
                {stock.symbol} {stock.name ? `- ${stock.name}` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.75rem' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          ) : chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.75rem' 
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.75rem' 
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
