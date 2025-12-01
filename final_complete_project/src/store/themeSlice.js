import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: localStorage.getItem('theme') === 'dark' || false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.isDark)
    },
    setTheme: (state, action) => {
      state.isDark = action.payload
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.isDark)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer