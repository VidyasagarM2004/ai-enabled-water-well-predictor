import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Droplets, 
  Map, 
  Database, 
  Cloud, 
  MessageCircle, 
  TrendingUp,
  MapPin,
  Activity
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const Dashboard = () => {
  const quickActions = [
    {
      title: 'Groundwater Prediction',
      description: 'AI-powered water well location prediction',
      icon: Droplets,
      path: '/dashboard/prediction',
      color: 'bg-blue-500'
    },
    {
      title: 'GPS & Map Tracking',
      description: 'View locations and track drilling sites',
      icon: Map,
      path: '/dashboard/map',
      color: 'bg-green-500'
    },
    {
      title: 'Soil & Rock Data',
      description: 'Explore geological data and formations',
      icon: Database,
      path: '/dashboard/data',
      color: 'bg-purple-500'
    },
    {
      title: 'Weather Insights',
      description: 'Current weather and historical data',
      icon: Cloud,
      path: '/dashboard/weather',
      color: 'bg-orange-500'
    },
    {
      title: 'AI Assistant',
      description: 'Chat with AI for expert guidance',
      icon: MessageCircle,
      path: '/dashboard/chat',
      color: 'bg-pink-500'
    }
  ]

  const stats = [
    { label: 'Predictions Made', value: '1,234', icon: TrendingUp },
    { label: 'Active Sites', value: '56', icon: MapPin },
    { label: 'Success Rate', value: '87%', icon: Activity }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your AI-powered water well prediction platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{action.description}</p>
                  <Link to={action.path}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">New prediction completed</p>
                <p className="text-sm text-muted-foreground">Location: 40.7128°N, 74.0060°W</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Map className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Site marked on map</p>
                <p className="text-sm text-muted-foreground">Potential drilling location saved</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Cloud className="h-5 w-5 text-orange-500" />
              <div>
                <p className="font-medium">Weather data updated</p>
                <p className="text-sm text-muted-foreground">Current conditions: Partly cloudy, 24°C</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard