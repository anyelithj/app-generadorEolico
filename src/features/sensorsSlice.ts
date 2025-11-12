import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SensorState, SensorData } from '@/types/sensors'
import { RootState } from './store'

const initialState: SensorState = {
  sensors: [], 
  isConnected: false, 
  error: null,
}


const sensorsSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {
    connectSensor(state) {
      state.isConnected = true
      state.error = null
    },
    disconnectSensor(state) {
      state.isConnected = false
    },
    updateSensorData(state, action: PayloadAction<SensorData>) {
      const index = state.sensors.findIndex(s => s.id === action.payload.id)
      if (index !== -1) {
        state.sensors[index] = action.payload
      } else {
        state.sensors.push(action.payload)
      }
    },
    setSensorError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

export const { connectSensor, disconnectSensor, updateSensorData, setSensorError } = sensorsSlice.actions


export const selectSensors = (state: RootState) => state.sensors

export default sensorsSlice.reducer

