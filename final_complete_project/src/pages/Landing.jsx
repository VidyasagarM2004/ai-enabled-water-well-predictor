import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, MapPin, Brain, Cloud, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Prediction',
      description: 'Advanced machine learning algorithms predict optimal drilling locations'
    },
    {
      icon: MapPin,
      title: 'GPS Mapping',
      description: 'Real-time location tracking with interactive mapping features'
    },
    {
      icon: Cloud,
      title: 'Weather Integration',
      description: 'Current conditions and historical data for better predictions'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Expert guidance through conversational AI interface'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Droplets className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Water Well Predictor</span>
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Water Well
            <span className="text-primary"> Prediction</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to find optimal groundwater locations. 
            Make informed decisions with our comprehensive prediction platform.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need for successful water well prediction</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Landing