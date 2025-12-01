import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { 
  Home, 
  Droplets, 
  Map, 
  Database, 
  Cloud, 
  MessageCircle, 
  LogOut, 
  Moon, 
  Sun,
  User
} from 'lucide-react'
import { Button } from './ui/Button'
import { toggleTheme } from '../store/themeSlice'
import { auth } from '../services/firebase'

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isDark } = useSelector((state) => state.theme)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/dashboard/prediction', icon: Droplets, label: 'Prediction' },
    { path: '/dashboard/map', icon: Map, label: 'GPS & Map' },
    { path: '/dashboard/data', icon: Database, label: 'Soil Data' },
    { path: '/dashboard/weather', icon: Cloud, label: 'Weather' },
    { path: '/dashboard/chat', icon: MessageCircle, label: 'AI Chat' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Droplets className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Water Well Predictor</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm">{user?.displayName || user?.email}</span>
            </div>
            
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout