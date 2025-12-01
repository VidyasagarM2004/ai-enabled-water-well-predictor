import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import predictionSlice from './predictionSlice'
import weatherSlice from './weatherSlice'
import themeSlice from './themeSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    prediction: predictionSlice,
    weather: weatherSlice,
    theme: themeSlice,
  },
})