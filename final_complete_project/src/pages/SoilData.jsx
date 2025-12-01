import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Mountain, Layers } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

const SoilData = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const soilRockData = [
    {
      id: 1,
      name: 'Clay Soil',
      type: 'soil',
      category: 'Fine-grained',
      waterRetention: 'High',
      drillingDifficulty: 'Medium',
      permeability: 'Low',
      description: 'Fine particles with high water retention capacity',
      image: '🏔️',
      suitability: 85
    },
    {
      id: 2,
      name: 'Sandy Soil',
      type: 'soil',
      category: 'Coarse-grained',
      waterRetention: 'Low',
      drillingDifficulty: 'Easy',
      permeability: 'High',
      description: 'Large particles with good drainage properties',
      image: '🏖️',
      suitability: 45
    },
    {
      id: 3,
      name: 'Loamy Soil',
      type: 'soil',
      category: 'Mixed',
      waterRetention: 'Medium',
      drillingDifficulty: 'Easy',
      permeability: 'Medium',
      description: 'Balanced mixture of sand, silt, and clay',
      image: '🌱',
      suitability: 75
    },
    {
      id: 4,
      name: 'Sedimentary Rock',
      type: 'rock',
      category: 'Layered',
      waterRetention: 'High',
      drillingDifficulty: 'Medium',
      permeability: 'Medium',
      description: 'Formed by deposition and compression of sediments',
      image: '🪨',
      suitability: 90
    },
    {
      id: 5,
      name: 'Igneous Rock',
      type: 'rock',
      category: 'Crystalline',
      waterRetention: 'Low',
      drillingDifficulty: 'Hard',
      permeability: 'Low',
      description: 'Formed from cooled and solidified magma',
      image: '🌋',
      suitability: 35
    },
    {
      id: 6,
      name: 'Metamorphic Rock',
      type: 'rock',
      category: 'Transformed',
      waterRetention: 'Medium',
      drillingDifficulty: 'Hard',
      permeability: 'Low',
      description: 'Formed by heat and pressure transformation',
      image: '💎',
      suitability: 55
    },
    {
      id: 7,
      name: 'Limestone',
      type: 'rock',
      category: 'Carbonate',
      waterRetention: 'High',
      drillingDifficulty: 'Medium',
      permeability: 'High',
      description: 'Porous rock excellent for groundwater storage',
      image: '🏛️',
      suitability: 95
    },
    {
      id: 8,
      name: 'Sandstone',
      type: 'rock',
      category: 'Clastic',
      waterRetention: 'Medium',
      drillingDifficulty: 'Medium',
      permeability: 'High',
      description: 'Porous sedimentary rock with good water flow',
      image: '🏜️',
      suitability: 80
    }
  ]

  const filteredData = soilRockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || item.type === selectedType
    return matchesSearch && matchesType
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRetentionColor = (retention) => {
    switch (retention) {
      case 'High': return 'text-blue-600 bg-blue-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSuitabilityColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Soil & Rock Data Explorer</h1>
        <p className="text-muted-foreground">
          Comprehensive database of geological formations and their properties
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search soil or rock types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
              >
                All Types
              </Button>
              <Button
                variant={selectedType === 'soil' ? 'default' : 'outline'}
                onClick={() => setSelectedType('soil')}
              >
                <Layers className="h-4 w-4 mr-2" />
                Soil
              </Button>
              <Button
                variant={selectedType === 'rock' ? 'default' : 'outline'}
                onClick={() => setSelectedType('rock')}
              >
                <Mountain className="h-4 w-4 mr-2" />
                Rock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{item.image}</div>
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getSuitabilityColor(item.suitability)}`}>
                    {item.suitability}% Suitable
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Water Retention</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getRetentionColor(item.waterRetention)}`}>
                      {item.waterRetention}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Drilling Difficulty</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(item.drillingDifficulty)}`}>
                      {item.drillingDifficulty}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Permeability</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: item.permeability === 'High' ? '100%' : 
                               item.permeability === 'Medium' ? '60%' : '30%' 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.permeability}</p>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Suitability Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.suitability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold">{item.suitability}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SoilData