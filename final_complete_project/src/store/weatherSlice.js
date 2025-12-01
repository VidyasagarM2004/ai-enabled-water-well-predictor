import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { weatherService } from '../services/weatherService'

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchData',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const data = await weatherService.getCurrentWeather(latitude, longitude)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchWeatherHistory = createAsyncThunk(
  'weather/fetchHistory',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const data = await weatherService.getWeatherHistory(latitude, longitude)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    weatherHistory: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearWeather: (state) => {
      state.currentWeather = null
      state.weatherHistory = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWeather = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action) => {
        state.weatherHistory = action.payload
      })
  },
})

export const { clearWeather } = weatherSlice.actions
export default weatherSlice.reducer