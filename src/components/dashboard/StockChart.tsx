// components/dashboard/StockChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { fetchHistoricalData, fetchWatchlist } from '@/lib/api';
import { HistoricalDataPoint, WatchlistStock } from '@/types';

interface StockChartProps {
  initialSymbol?: string;
}

export function StockChart({ initialSymbol = 'AAPL' }: StockChartProps) {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([initialSymbol]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('line');
  const [showPercentages, setShowPercentages] = useState(false);
  const [availableStocks, setAvailableStocks] = useState<WatchlistStock[]>([]);
  const [timeframe, setTimeframe] = useState('1m');

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', 
    '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'
  ];

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

  useEffect(() => {
    async function loadHistoricalData() {
      if (selectedSymbols.length === 0) return;
      
      setLoading(true);
      try {
        // Fetch data for each selected symbol
        const allData = await Promise.all(
          selectedSymbols.map(async (symbol) => {
            try {
              const historicalData = await fetchHistoricalData(symbol);
              return { symbol, data: historicalData };
            } catch (error) {
              console.error(`Error loading historical data for ${symbol}:`, error);
              return { symbol, data: [] };
            }
          })
        );
        
        // Process and combine the data
        const processedData = processChartData(allData, showPercentages, timeframe);
        setData(processedData);
      } catch (error) {
        console.error('Error loading chart data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHistoricalData();
    
    // Set up interval to refresh data every minute
    const intervalId = setInterval(() => {
      loadHistoricalData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [selectedSymbols, showPercentages, timeframe]);

  function processChartData(allData, usePercentages, timeframe) {
    // Filter data based on timeframe
    const now = new Date();
    const timeframeMap = {
      '1w': 7,
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365,
      'all': Infinity
    };
    
    const daysToInclude = timeframeMap[timeframe];
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - daysToInclude);
    
    // Combine data from all symbols
    const combinedData = {};
    
    allData.forEach(({ symbol, data }) => {
      // Sort data by date and filter by timeframe
      const filteredData = data
        .filter(item => new Date(item.date) >= cutoffDate)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Calculate base value for percentages if needed
      const baseValue = usePercentages && filteredData.length > 0 ? filteredData[0].close : 1;
      
      filteredData.forEach(item => {
        const date = new Date(item.date).toISOString().split('T')[0];
        
        if (!combinedData[date]) {
          combinedData[date] = { date };
        }
        
        const value = usePercentages 
          ? ((item.close / baseValue) - 1) * 100 
          : item.close;
        
        combinedData[date][symbol] = value;
      });
    });
    
    return Object.values(combinedData);
  }

  const handleSymbolChange = (value: string) => {
    const symbols = value.split(',');
    setSelectedSymbols(symbols);
  };

  const handleChartTypeChange = (value: string) => {
    setChartType(value);
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  if (loading && data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Stock Price History</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="percentages" 
              checked={showPercentages}
              onCheckedChange={setShowPercentages}
            />
            <Label htmlFor="percentages">Show Percentages</Label>
          </div>
          
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-[100px]">
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
          
          <Select value={chartType} onValueChange={handleChartTypeChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedSymbols.join(',')} 
            onValueChange={handleSymbolChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select stocks" />
            </SelectTrigger>
            <SelectContent>
              {availableStocks.map((stock) => (
                <SelectItem key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - {stock.name}
                </SelectItem>
              ))}
              <SelectItem value="AAPL,MSFT,GOOGL">Top Tech</SelectItem>
              <SelectItem value="AAPL,MSFT,GOOGL,AMZN,META">FAANG+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(value) => showPercentages ? `${value.toFixed(2)}%` : `$${value.toFixed(2)}`}
                />
                <Tooltip 
                  formatter={(value: number, name) => [
                    showPercentages ? `${value.toFixed(2)}%` : `$${value.toFixed(2)}`, 
                    name
                  ]}
                />
                <Legend />
                {selectedSymbols.map((symbol, index) => (
                  <Line 
                    key={symbol}
                    type="monotone" 
                    dataKey={symbol} 
                    stroke={colors[index % colors.length]} 
                    activeDot={{ r: 8 }} 
                    name={symbol}
                  />
                ))}
              </LineChart>
            ) : chartType === 'area' ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(value) => showPercentages ? `${value.toFixed(2)}%` : `$${value.toFixed(2)}`}
                />
                <Tooltip 
                  formatter={(value: number, name) => [
                    showPercentages ? `${value.toFixed(2)}%` : `$${value.toFixed(2)}`, 
                    name
                  ]}
                />
                <Legend />
                {selectedSymbols.map((symbol, index) => (
                  <Area 
                    key={symbol}
                    type="monotone" 
                    dataKey={symbol} 
                    stroke={colors[index % colors.length]} 
                    fill={colors[index % colors.length]} 
                    fillOpacity={0.3}
                    name={symbol}
                  />
                ))}
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(value) => showPercentages ? `${value.toFixed(2)}%` : `$${value.toFixed(2)}`}
                />
                <Tooltip 
                  formatter={(value: number, name) => [
                    showPercentages ? `${value.toFixed(2)}%` : `$${value.toFixed(2)}`, 
                    name
                  ]}
                />
                <Legend />
                {selectedSymbols.map((symbol, index) => (
                  <Bar 
                    key={symbol}
                    dataKey={symbol} 
                    fill={colors[index % colors.length]} 
                    name={symbol}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
