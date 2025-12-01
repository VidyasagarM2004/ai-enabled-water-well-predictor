import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, HelpCircle, MapPin, Droplets, Cloud } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI assistant for water well prediction. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const faqQuestions = [
    {
      question: 'What factors affect groundwater prediction?',
      icon: Droplets,
      answer: 'Groundwater prediction depends on several key factors: soil type (clay retains more water than sand), rock formation (sedimentary rocks are generally better), depth of drilling, local topography, rainfall patterns, and geological history of the area.'
    },
    {
      question: 'How accurate are the predictions?',
      icon: HelpCircle,
      answer: 'Our AI model achieves 85-90% accuracy based on the input parameters. However, actual results may vary due to local geological variations. We recommend conducting a geological survey for critical projects.'
    },
    {
      question: 'What is the best time to drill?',
      icon: Cloud,
      answer: 'The optimal drilling time is typically during the early monsoon season (June-July) when groundwater levels are replenished but before heavy rains make access difficult. Avoid drilling during extreme weather conditions.'
    },
    {
      question: 'How do I interpret the location data?',
      icon: MapPin,
      answer: 'Location coordinates help determine regional geological patterns. Areas near water bodies, in valleys, or with historical water sources typically have better groundwater potential. Elevation and proximity to recharge areas are also important factors.'
    }
  ]

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('groundwater') || message.includes('water level')) {
      return 'Groundwater levels vary based on local geology, rainfall, and seasonal patterns. For your specific location, I recommend using our prediction tool with your soil type, rock formation, and depth requirements. Would you like me to guide you through the prediction process?'
    }
    
    if (message.includes('soil') || message.includes('clay') || message.includes('sand')) {
      return 'Different soil types have varying water retention capabilities:\n\n• Clay soil: High water retention, medium drilling difficulty\n• Sandy soil: Low retention but easy drilling\n• Loamy soil: Balanced properties, good for wells\n\nWhat type of soil are you working with?'
    }
    
    if (message.includes('rock') || message.includes('stone')) {
      return 'Rock formations significantly impact groundwater:\n\n• Sedimentary rocks (limestone, sandstone): Excellent for groundwater\n• Igneous rocks: Generally poor water storage\n• Metamorphic rocks: Variable, depends on fractures\n\nLimestone and sandstone are typically the best for water wells.'
    }
    
    if (message.includes('depth') || message.includes('drill')) {
      return 'Drilling depth recommendations:\n\n• Shallow wells (10-30m): Suitable for areas with high water tables\n• Medium depth (30-100m): Most common for residential use\n• Deep wells (100m+): Required in arid regions or areas with deep aquifers\n\nThe optimal depth depends on your local water table and geological conditions.'
    }
    
    if (message.includes('weather') || message.includes('rain')) {
      return 'Weather significantly affects groundwater:\n\n• Rainfall recharges aquifers\n• Dry seasons lower water tables\n• Temperature affects evaporation rates\n• Humidity indicates local water availability\n\nCheck our Weather section for current conditions and their impact on groundwater levels.'
    }
    
    if (message.includes('location') || message.includes('gps') || message.includes('map')) {
      return 'Location is crucial for groundwater prediction:\n\n• Valleys and low-lying areas typically have better groundwater\n• Areas near rivers or lakes have higher water tables\n• Mountainous regions may have deeper water tables\n• Coastal areas may have saltwater intrusion issues\n\nUse our GPS & Map feature to mark potential drilling sites and analyze their suitability.'
    }
    
    if (message.includes('cost') || message.includes('price')) {
      return 'Well drilling costs vary by:\n\n• Depth required (deeper = more expensive)\n• Soil/rock type (harder materials cost more)\n• Location accessibility\n• Equipment needed\n• Local labor rates\n\nTypically ranges from $3,000-$15,000 for residential wells. Get quotes from local drilling contractors for accurate estimates.'
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return 'Hello! I\'m here to help with your water well questions. I can assist with:\n\n• Groundwater prediction analysis\n• Soil and rock type information\n• Optimal drilling locations\n• Weather impact on water levels\n• Best practices for well drilling\n\nWhat would you like to know?'
    }
    
    return 'I understand you\'re asking about water well prediction. While I can provide general guidance, I recommend using our prediction tool for specific analysis. You can also explore our soil data, weather insights, and map features for comprehensive information. Is there a specific aspect of groundwater prediction you\'d like to know more about?'
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleFAQClick = (faq) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: faq.question,
      timestamp: new Date()
    }

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: faq.answer,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botMessage])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">
          Get expert guidance on groundwater prediction and well drilling
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* FAQ Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqQuestions.map((faq, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFAQClick(faq)}
                className="w-full p-3 text-left bg-muted hover:bg-accent rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <faq.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{faq.question}</span>
                </div>
              </motion.button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>AI Water Well Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-muted'}`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-muted">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about groundwater prediction, soil types, drilling..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Chat