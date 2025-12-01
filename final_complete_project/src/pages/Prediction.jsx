import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, MapPin, Loader2 } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { generatePrediction } from '../store/predictionSlice'
import { useGeolocation } from '../hooks/useGeolocation'

const Prediction = () => {
  const dispatch = useDispatch()
  const { currentPrediction, isLoading } = useSelector((state) => state.prediction)
  const { location, getCurrentLocation } = useGeolocation()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    if (location) {
      setValue('latitude', location.latitude.toFixed(6))
      setValue('longitude', location.longitude.toFixed(6))
    }
  }, [location, setValue])

  const onSubmit = async (data) => {
    const predictionData = {
      ...data,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      depth: parseInt(data.depth)
    }
    
    const result = await dispatch(generatePrediction(predictionData))
    if (result.type === 'prediction/generate/fulfilled') {
      toast.success('Prediction generated successfully!')
    }
  }

  const exportToPDF = async () => {
    if (!currentPrediction) return

    const element = document.getElementById('prediction-results')
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF()
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('water-well-prediction-report.pdf')
    toast.success('Report exported successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Groundwater Prediction</h1>
        <p className="text-muted-foreground">
          AI-powered analysis for optimal water well placement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Form */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Soil Type</label>
                  <select
                    {...register('soilType', { required: 'Soil type is required' })}
                    className="w-full mt-1 p-2 border rounded-md bg-background"
                  >
                    <option value="">Select soil type</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="rocky">Rocky</option>
                  </select>
                  {errors.soilType && (
                    <p className="text-sm text-destructive mt-1">{errors.soilType.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Rock Type</label>
                  <select
                    {...register('rockType', { required: 'Rock type is required' })}
                    className="w-full mt-1 p-2 border rounded-md bg-background"
                  >
                    <option value="">Select rock type</option>
                    <option value="sedimentary">Sedimentary</option>
                    <option value="igneous">Igneous</option>
                    <option value="metamorphic">Metamorphic</option>
                  </select>
                  {errors.rockType && (
                    <p className="text-sm text-destructive mt-1">{errors.rockType.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Depth Range (meters)</label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  {...register('depth', {
                    required: 'Depth is required',
                    min: { value: 10, message: 'Minimum depth is 10 meters' },
                    max: { value: 200, message: 'Maximum depth is 200 meters' }
                  })}
                />
                {errors.depth && (
                  <p className="text-sm text-destructive mt-1">{errors.depth.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Latitude</label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="e.g., 40.7128"
                    {...register('latitude', { required: 'Latitude is required' })}
                  />
                  {errors.latitude && (
                    <p className="text-sm text-destructive mt-1">{errors.latitude.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Longitude</label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="e.g., -74.0060"
                    {...register('longitude', { required: 'Longitude is required' })}
                  />
                  {errors.longitude && (
                    <p className="text-sm text-destructive mt-1">{errors.longitude.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="w-full"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Prediction...
                  </>
                ) : (
                  'Generate Prediction'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {currentPrediction && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            id="prediction-results"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Prediction Results</CardTitle>
                  <Button onClick={exportToPDF} size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Confidence Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {currentPrediction.confidence}%
                  </div>
                  <p className="text-muted-foreground">Confidence Score</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-semibold">{currentPrediction.waterLevel}m</div>
                    <p className="text-sm text-muted-foreground">Expected Water Level</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-semibold">{currentPrediction.estimatedYield}L/h</div>
                    <p className="text-sm text-muted-foreground">Estimated Yield</p>
                  </div>
                </div>

                {/* Chart */}
                <div>
                  <h4 className="font-semibold mb-3">Analysis Breakdown</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={currentPrediction.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Recommendations</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">{currentPrediction.recommendation}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Best drilling time: {currentPrediction.bestTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Prediction