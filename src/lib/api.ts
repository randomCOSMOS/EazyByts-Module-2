// lib/api.ts
const URL = 'localhost:5000/api';
// const URL = 'api.tiingo.com';
export async function fetchWatchlist() {
    const response = await fetch(`http://${URL}/watchlist`);
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    return response.json();
  }
  
  export async function fetchStockQuote(symbol: string) {
    const response = await fetch(`http://${URL}/iex/${symbol}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch quote for ${symbol}`);
    }
    return response.json();
  }
  
  export async function fetchHistoricalData(symbol: string) {
    const response = await fetch(`http://${URL}/tiingo/daily/${symbol}/prices`);
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data for ${symbol}`);
    }
    return response.json();
  }
  