import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QRState } from '@/types/qr'
import { RootState } from './store'

const initialState: QRState = {
  dataUrl: '',
  url: '',
  isGenerated: false,
  error: null,
}

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    generateQR(state, action: PayloadAction<{ url: string; dataUrl: string }>) {
      state.url = action.payload.url
      state.dataUrl = action.payload.dataUrl
      state.isGenerated = true
      state.error = null
    },
    clearQR(state) {
      state.isGenerated = false
      state.dataUrl = ''
      state.url = ''
    },
    setQRError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

export const { generateQR, clearQR, setQRError } = qrSlice.actions

export const selectQR = (state: RootState) => state.qr

export default qrSlice.reducer


