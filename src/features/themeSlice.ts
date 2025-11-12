// features/themeSlice.ts
// 🎨 Slice encargado de manejar el tema (oscuro / claro) y preferencias UI.
// ✅ Aplica el patrón Singleton (store global único).

import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface ThemeState {
  mode: 'light' | 'dark' // Modo visual
}

const initialState: ThemeState = {
  mode: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      // 🌗 Alterna entre modo claro y oscuro
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setTheme(state, action: { payload: 'light' | 'dark' }) {
      // 🎛️ Define manualmente el tema
      state.mode = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme.mode

export default themeSlice.reducer

// final
