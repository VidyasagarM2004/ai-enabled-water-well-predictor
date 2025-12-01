import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    clearUser: (state) => {
      state.user = null
      state.token = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, clearUser, clearError } = authSlice.actions
export default authSlice.reducer