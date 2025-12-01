import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

class WeatherService {
  async getCurrentWeather(lat, lon) {
    try {
      // Always return mock data for demo
      return this.getMockWeatherData()
    } catch (error) {
      console.error('Weather API error:', error)
      return this.getMockWeatherData()
    }
  }

  async getWeatherHistory(lat, lon) {
    // Mock historical data for the past 7 days
    const history = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      history.push({
        date: date.toISOString().split('T')[0],
        temperature: Math.round(20 + Math.random() * 15),
        humidity: Math.round(40 + Math.random() * 40),
        rainfall: Math.round(Math.random() * 10)
      })
    }
    return history
  }

  getMockWeatherData() {
    return {
      temperature: Math.round(20 + Math.random() * 15),
      humidity: Math.round(40 + Math.random() * 40),
      description: 'Partly cloudy',
      windSpeed: Math.round(Math.random() * 10),
      pressure: Math.round(1000 + Math.random() * 50),
      location: 'Current Location'
    }
  }
}

export const weatherService = new WeatherService()