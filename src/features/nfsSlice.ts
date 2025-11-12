
import { createSlice, PayloadAction } from '@reduxjs/toolkit' 
import { NFSData } from '@/types/nfs' 
import { RootState } from './store' 


interface NFSState {
  simulations: NFSData[] 
  loading: boolean 
  error: string | null 
}

const initialState: NFSState = {
  simulations: [],
  loading: false,
  error: null,
}


const nfsSlice = createSlice({
  name: 'nfs',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true
      state.error = null
    },
    setSimulations(state, action: PayloadAction<NFSData[]>) {
      state.simulations = action.payload
      state.loading = false
    },
    addSimulation(state, action: PayloadAction<NFSData>) {
      state.simulations.push(action.payload)
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
  },
})


export const { startLoading, setSimulations, addSimulation, setError } = nfsSlice.actions

export const selectNFS = (state: RootState) => state.nfs


export default nfsSlice.reducer

