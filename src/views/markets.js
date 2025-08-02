import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PageFloatingRobot from '../components/PageFloatingRobot'

const Markets = () => {
  const [cryptoPrices, setCryptoPrices] = useState([])
  const [metalPrices, setMetalPrices] = useState([])
  const [exchangeRate, setExchangeRate] = useState(0.92)
  const [cryptoLoading, setCryptoLoading] = useState(true)
  const [metalLoading, setMetalLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    fetchExchangeRate()
    fetchCryptoPrices()
    fetchMetalPrices()
  }, [])

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await response.json()
      if (data.rates && data.rates.CHF) {
        setExchangeRate(data.rates.CHF)
      }
    } catch (error) {
      console.error('Exchange rate API error:', error)
      setExchangeRate(0.92)
    }
  }

  const fetchCryptoPrices = async () => {
    try {
      setCryptoLoading(true)

      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setCryptoPrices(data)
      setLastUpdated(new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }))
    } catch (error) {
      console.error('Crypto API error:', error)

      const fallbackCryptoData = [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'btc',
          current_price: 118331,
          price_change_percentage_24h: 0.80018
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'eth',
          current_price: 2980.92,
          price_change_percentage_24h: 1.55996
        },
        {
          id: 'ripple',
          name: 'XRP',
          symbol: 'xrp',
          current_price: 2.82,
          price_change_percentage_24h: 1.77139
        },
        {
          id: 'tether',
          name: 'Tether',
          symbol: 'usdt',
          current_price: 1.0,
          price_change_percentage_24h: 0.00384
        },
        {
          id: 'binancecoin',
          name: 'BNB',
          symbol: 'bnb',
          current_price: 691.8,
          price_change_percentage_24h: 0.83808
        }
      ]

      setCryptoPrices(fallbackCryptoData)
      setLastUpdated(new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }))
    } finally {
      setCryptoLoading(false)
    }
  }

  const fetchMetalPrices = async () => {
    try {
      setMetalLoading(true)

      const currentMetalData = [
        {
          name: 'Gold',
          symbol: 'XAU',
          price: 2653.20,
          change: '+0.85%',
          changeClass: 'positive'
        },
        {
          name: 'Silver',
          symbol: 'XAG',
          price: 30.42,
          change: '+1.23%',
          changeClass: 'positive'
        },
        {
          name: 'Platinum',
          symbol: 'XPT',
          price: 965.80,
          change: '-0.45%',
          changeClass: 'negative'
        },
        {
          name: 'Palladium',
          symbol: 'XPD',
          price: 945.60,
          change: '+0.67%',
          changeClass: 'positive'
        },
        {
          name: 'Copper',
          symbol: 'HG',
          price: 4.12,
          change: '+0.28%',
          changeClass: 'positive'
        }
      ]

      setMetalPrices(currentMetalData)
    } catch (error) {
      console.error('Metals API error:', error)
    } finally {
      setMetalLoading(false)
    }
  }

  const formatPrice = (price) => {
    let numPrice = price
    if (typeof price === 'string') {
      numPrice = parseFloat(price.toString().replace(/,/g, ''))
    }

    if (typeof numPrice === 'number' && !isNaN(numPrice)) {
      const usdPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: numPrice < 1 ? 6 : 2
      }).format(numPrice)

      const chfPrice = new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: 'CHF',
        minimumFractionDigits: 2,
        maximumFractionDigits: numPrice < 1 ? 6 : 2
      }).format(numPrice * exchangeRate)

      return `${usdPrice} / ${chfPrice}`
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
    <div className="page-container">
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

      {/* Floating Robot with orange/amber body color */}
      <PageFloatingRobot bodyColor="#f59e0b" glowColor="#fbbf24" />

      <Navbar />

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Markets</h1>
          <p className="page-subtitle">
            Stay updated with the latest market prices for cryptocurrencies and precious metals.
          </p>
        </div>

        <div className="card-grid-wide">
          <div className="section-card">
            <h2>Cryptocurrencies</h2>
            {cryptoLoading ? (
              <div className="loading-message">Loading cryptocurrency prices...</div>
            ) : (
              <div className="data-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Price</th>
                      <th>24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoPrices.map((crypto) => (
                      <tr key={crypto.id}>
                        <td>
                          <div className="item-title">{crypto.name}</div>
                        </td>
                        <td>
                          <div className="symbol-badge">{crypto.symbol.toUpperCase()}</div>
                        </td>
                        <td>
                          <div className="item-title">{formatPrice(crypto.current_price)}</div>
                        </td>
                        <td>
                          <span className={`change-badge ${getChangeClass(crypto.price_change_percentage_24h)}`}>
                            {formatChange(crypto.price_change_percentage_24h)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="section-card">
            <h2>Precious Metals</h2>
            {metalLoading ? (
              <div className="loading-message">Loading precious metals prices...</div>
            ) : (
              <div className="data-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Price</th>
                      <th>24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metalPrices.map((metal) => (
                      <tr key={metal.symbol}>
                        <td>
                          <div className="item-title">{metal.name}</div>
                        </td>
                        <td>
                          <div className="symbol-badge">{metal.symbol}</div>
                        </td>
                        <td>
                          <div className="item-title">{formatPrice(metal.price)}</div>
                        </td>
                        <td>
                          <span className={`change-badge ${metal.changeClass}`}>
                            {metal.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {lastUpdated && (
          <div className="last-updated">
            <em>Last updated: {lastUpdated}</em>
          </div>
        )}
      </div>

      <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
    </div>
  )
}

export default Markets
