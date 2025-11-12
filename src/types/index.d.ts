
import type { NFSInputs, NFSResults } from './nfs'
import type { SensorData } from './sensors'
import type { QRPayload } from './qr'

export type ChildrenProp = {
  children?: React.ReactNode
}


export interface SimulationSummary {
  id: string
  name?: string
  createdAt: number
  inputs: NFSInputs
  results: NFSResults
}


export interface ApiResponse<T = any> {
  ok: boolean
  data?: T
  error?: string
}


export type { NFSInputs, NFSResults, SensorData, QRPayload }

