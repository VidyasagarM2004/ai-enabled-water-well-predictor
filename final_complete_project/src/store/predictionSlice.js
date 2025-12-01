import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const generatePrediction = createAsyncThunk(
  'prediction/generate',
  async (predictionData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock ML prediction logic
      const { soilType, rockType, depth, latitude, longitude } = predictionData
      
      const soilScores = {
        'clay': 0.8,
        'sandy': 0.4,
        'loamy': 0.7,
        'rocky': 0.3
      }
      
      const rockScores = {
        'sedimentary': 0.9,
        'igneous': 0.5,
        'metamorphic': 0.6
      }
      
      const depthScore = depth > 50 ? 0.8 : depth > 30 ? 0.6 : 0.4
      const soilScore = soilScores[soilType] || 0.5
      const rockScore = rockScores[rockType] || 0.5
      
      const confidence = Math.round((soilScore + rockScore + depthScore) / 3 * 100)
      const waterLevel = Math.round(depth * (confidence / 100) * 0.8)
      
      const result = {
        id: Date.now(),
        confidence,
        waterLevel,
        recommendation: confidence > 70 ? 'Excellent location for drilling' : 
                      confidence > 50 ? 'Good potential, proceed with caution' : 
                      'Poor location, consider alternative sites',
        bestTime: 'Early monsoon season (June-July)',
        estimatedYield: Math.round(waterLevel * 1.5),
        location: { latitude, longitude },
        timestamp: new Date().toISOString(),
        chartData: [
          { name: 'Soil Quality', value: Math.round(soilScore * 100) },
          { name: 'Rock Formation', value: Math.round(rockScore * 100) },
          { name: 'Depth Factor', value: Math.round(depthScore * 100) },
          { name: 'Overall Score', value: confidence }
        ]
      }
      
      return result
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const predictionSlice = createSlice({
  name: 'prediction',
  initialState: {
    currentPrediction: null,
    predictions: (() => {
      try {
        return JSON.parse(localStorage.getItem('predictions')) || []
      } catch {
        return []
      }
    })(),
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPrediction: (state) => {
      state.currentPrediction = null
    },
    savePrediction: (state, action) => {
      state.predictions.push(action.payload)
      try {
        localStorage.setItem('predictions', JSON.stringify(state.predictions))
      } catch (error) {
        console.error('Failed to save to localStorage:', error)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePrediction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(generatePrediction.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPrediction = action.payload
        state.predictions.push(action.payload)
        try {
          localStorage.setItem('predictions', JSON.stringify(state.predictions))
        } catch (error) {
          console.error('Failed to save to localStorage:', error)
        }
      })
      .addCase(generatePrediction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearPrediction, savePrediction } = predictionSlice.actions
export default predictionSlice.reducer