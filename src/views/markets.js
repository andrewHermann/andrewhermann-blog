import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './markets.css'

const Markets = () => {
  const [cryptoPrices, setCryptoPrices] = useState([])
  const [metalPrices, setMetalPrices] = useState([])
  const [cryptoLoading, setCryptoLoading] = useState(true)
  const [metalLoading, setMetalLoading] = useState(true)
  const [cryptoError, setCryptoError] = useState(null)
  const [metalError, setMetalError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    fetchCryptoPrices()
    fetchMetalPrices()
  }, [])

  const fetchCryptoPrices = async () => {
    try {
      setCryptoLoading(true)
      setCryptoError(null)
      
      // Using CoinGecko API for cryptocurrency prices
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en')
      
      if (!response.ok) {
        throw new Error('Failed to fetch cryptocurrency data')
      }
      
      const data = await response.json()
      setCryptoPrices(data)
      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      setCryptoError('Unable to fetch cryptocurrency prices')
      console.error('Crypto API error:', error)
    } finally {
      setCryptoLoading(false)
    }
  }

  const fetchMetalPrices = async () => {
    try {
      setMetalLoading(true)
      setMetalError(null)
      
      // Using metals-api.com for precious metals prices
      const response = await fetch('https://metals-api.com/api/latest?access_key=YOUR_API_KEY&base=USD&symbols=XAU,XAG,XPT,XPD')
      
      if (!response.ok) {
        throw new Error('Failed to fetch metals data')
      }
      
      const data = await response.json()
      
      // Convert rates to prices per ounce (metals-api returns rates, we need to invert)
      const metalData = [
        {
          name: 'Gold',
          symbol: 'XAU',
          price: data.rates?.XAU ? (1 / data.rates.XAU).toFixed(2) : 'N/A',
          change: '+1.2%',
          changeClass: 'positive'
        },
        {
          name: 'Silver',
          symbol: 'XAG',
          price: data.rates?.XAG ? (1 / data.rates.XAG).toFixed(2) : 'N/A',
          change: '-0.8%',
          changeClass: 'negative'
        },
        {
          name: 'Platinum',
          symbol: 'XPT',
          price: data.rates?.XPT ? (1 / data.rates.XPT).toFixed(2) : 'N/A',
          change: '+0.3%',
          changeClass: 'positive'
        },
        {
          name: 'Palladium',
          symbol: 'XPD',
          price: data.rates?.XPD ? (1 / data.rates.XPD).toFixed(2) : 'N/A',
          change: '+2.1%',
          changeClass: 'positive'
        }
      ]
      
      setMetalPrices(metalData)
    } catch (error) {
      // Fallback to mock data if API fails
      const mockMetalData = [
        {
          name: 'Gold',
          symbol: 'XAU',
          price: '1,950.00',
          change: '+1.2%',
          changeClass: 'positive'
        },
        {
          name: 'Silver',
          symbol: 'XAG',
          price: '24.50',
          change: '-0.8%',
          changeClass: 'negative'
        },
        {
          name: 'Platinum',
          symbol: 'XPT',
          price: '980.00',
          change: '+0.3%',
          changeClass: 'positive'
        },
        {
          name: 'Palladium',
          symbol: 'XPD',
          price: '1,120.00',
          change: '+2.1%',
          changeClass: 'positive'
        }
      ]
      
      setMetalPrices(mockMetalData)
      setMetalError('Using demo data - live feed unavailable')
    } finally {
      setMetalLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      }).format(price)
    }
    return price
  }

  const formatChange = (change) => {
    if (typeof change === 'number') {
      return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
    }
    return change
  }

  const getChangeClass = (change) => {
    if (typeof change === 'number') {
      return change >= 0 ? 'positive' : 'negative'
    }
    return ''
  }

  return (
    <div className="markets-container">
      <Helmet>
        <title>Markets - Andrew J. Hermann</title>
        <meta 
          name="description" 
          content="View the latest cryptocurrency and precious metal prices with real-time market data." 
        />
        <meta name="keywords" content="cryptocurrency prices, precious metals, market data, bitcoin, ethereum, gold, silver, platinum" />
        <meta name="author" content="Andrew J. Hermann" />
        
        <meta property="og:title" content="Markets - Andrew J. Hermann" />
        <meta property="og:description" content="View the latest cryptocurrency and precious metal prices with real-time market data." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://andrew.cloudhopper.ch/markets" />
        <meta property="og:site_name" content="Andrew J. Hermann" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Markets - Andrew J. Hermann" />
        <meta name="twitter:description" content="View the latest cryptocurrency and precious metal prices with real-time market data." />
        
        <link rel="canonical" href="https://andrew.cloudhopper.ch/markets" />
      </Helmet>

      <Navbar />

      <div className="markets-content">
        <div className="markets-header">
          <h1 className="markets-title">Markets</h1>
          <p className="markets-subtitle">
            Stay updated with the latest market prices for cryptocurrencies and precious metals.
          </p>
        </div>

        <div className="markets-main">
          <div className="markets-column">
            <h2>Cryptocurrencies</h2>
            {cryptoLoading ? (
              <div className="markets-loading">Loading cryptocurrency prices...</div>
            ) : cryptoError ? (
              <div className="markets-error">{cryptoError}</div>
            ) : (
              <ul className="markets-list">
                {cryptoPrices.map((crypto) => (
                  <li key={crypto.id} className="markets-item">
                    <div>
                      <span className="markets-item-name">{crypto.name}</span>
                      <span className="markets-item-symbol">({crypto.symbol.toUpperCase()})</span>
                    </div>
                    <div>
                      <span className="markets-item-price">{formatPrice(crypto.current_price)}</span>
                      <span className={`markets-item-change ${getChangeClass(crypto.price_change_percentage_24h)}`}>
                        {formatChange(crypto.price_change_percentage_24h)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="markets-column">
            <h2>Precious Metals</h2>
            {metalLoading ? (
              <div className="markets-loading">Loading precious metals prices...</div>
            ) : metalError ? (
              <div className="markets-error">{metalError}</div>
            ) : null}
            
            <ul className="markets-list">
              {metalPrices.map((metal) => (
                <li key={metal.symbol} className="markets-item">
                  <div>
                    <span className="markets-item-name">{metal.name}</span>
                    <span className="markets-item-symbol">({metal.symbol})</span>
                  </div>
                  <div>
                    <span className="markets-item-price">${metal.price}</span>
                    <span className={`markets-item-change ${metal.changeClass}`}>
                      {metal.change}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {lastUpdated && (
          <div className="markets-last-updated">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>

      <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
    </div>
  )
}

export default Markets
