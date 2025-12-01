import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Cloud, Droplets, Wind, Thermometer, Eye, Gauge } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { fetchWeatherData, fetchWeatherHistory } from '../store/weatherSlice'
import { useGeolocation } from '../hooks/useGeolocation'

const Weather = () => {
  const dispatch = useDispatch()
  const { currentWeather, weatherHistory, isLoading } = useSelector((state) => state.weather)
  const { location, getCurrentLocation } = useGeolocation()

  useEffect(() => {
    if (location) {
      dispatch(fetchWeatherData({ 
        latitude: location.latitude, 
        longitude: location.longitude 
      }))
      dispatch(fetchWeatherHistory({ 
        latitude: location.latitude, 
        longitude: location.longitude 
      }))
    }
  }, [location, dispatch])

  const weatherImpact = {
    temperature: currentWeather?.temperature || 0,
    humidity: currentWeather?.humidity || 0,
    impact: currentWeather ? 
      (currentWeather.temperature > 30 ? 'High evaporation may lower water levels' :
       currentWeather.temperature < 10 ? 'Cold weather may affect drilling operations' :
       'Optimal temperature for drilling operations') : 'No data available',
    recommendation: currentWeather?.humidity > 70 ? 
      'High humidity indicates good groundwater conditions' :
      currentWeather?.humidity < 30 ?
      'Low humidity may indicate dry conditions' :
      'Moderate humidity levels detected'
  }

  const WeatherCard = ({ title, value, unit, icon: Icon, color }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              {value}{unit}
            </p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weather Insights</h1>
          <p className="text-muted-foreground">
            Current weather conditions and their impact on groundwater
          </p>
        </div>
        <Button onClick={getCurrentLocation} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh Weather'}
        </Button>
      </div>

      {currentWeather ? (
        <>
          {/* Current Weather Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <WeatherCard
                title="Temperature"
                value={currentWeather.temperature}
                unit="°C"
                icon={Thermometer}
                color="text-red-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <WeatherCard
                title="Humidity"
                value={currentWeather.humidity}
                unit="%"
                icon={Droplets}
                color="text-blue-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <WeatherCard
                title="Wind Speed"
                value={currentWeather.windSpeed}
                unit=" m/s"
                icon={Wind}
                color="text-green-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <WeatherCard
                title="Pressure"
                value={currentWeather.pressure}
                unit=" hPa"
                icon={Gauge}
                color="text-purple-500"
              />
            </motion.div>
          </div>

          {/* Current Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5" />
                  <span>Current Conditions - {currentWeather.location}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Weather Description</h4>
                    <p className="text-lg capitalize">{currentWeather.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Visibility: Good • UV Index: Moderate
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Impact on Groundwater</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Temperature Impact</p>
                        <p className="text-sm text-muted-foreground">{weatherImpact.impact}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Humidity Analysis</p>
                        <p className="text-sm text-muted-foreground">{weatherImpact.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Historical Data Charts */}
          {weatherHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Temperature Trend (7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weatherHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: '#ef4444' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rainfall & Humidity (7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weatherHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rainfall" fill="#3b82f6" name="Rainfall (mm)" />
                      <Bar dataKey="humidity" fill="#06b6d4" name="Humidity (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Weather Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Drilling Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Optimal Conditions</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Temperature: 15-25°C</li>
                      <li>• Humidity: 60-80%</li>
                      <li>• Low wind conditions</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Current Status</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {currentWeather.temperature >= 15 && currentWeather.temperature <= 25 && 
                       currentWeather.humidity >= 60 && currentWeather.humidity <= 80 ?
                        'Excellent conditions for drilling operations' :
                        'Moderate conditions - proceed with caution'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Best Time</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Early morning (6-10 AM) typically offers the most stable conditions for drilling operations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Weather Data</h3>
            <p className="text-muted-foreground mb-4">
              Enable location access to get current weather information
            </p>
            <Button onClick={getCurrentLocation}>
              Get Weather Data
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Weather