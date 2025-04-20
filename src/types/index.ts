// types/index.ts
export interface WatchlistStock {
    symbol: string;
    name?: string;
  }
  
  export interface StockQuote {
    ticker: string;
    timestamp: string;
    open: number;
    high: number;
    low: number;
    tngoLast: number;
    volume: number;
    prevClose: number;
  }
  
  export interface HistoricalDataPoint {
    date: string;
    close: number;
    high: number;
    low: number;
    open: number;
    volume: number;
    adjClose: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
  }
  
  export interface PortfolioItem {
    symbol: string;
    shares: number;
    avgPrice: number;
    currentPrice: number;
  }
  
  export interface TradeHistoryItem {
    id: string;
    symbol: string;
    type: 'buy' | 'sell';
    shares: number;
    price: number;
    timestamp: string;
  }
  