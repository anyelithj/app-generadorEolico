
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { computeAll, PhysicsResults } from "../lib/physics";


type Inputs = {
  radius: number;
  windSpeed: number;
  density: number;
  efficiency: number; 
  cp?: number;
};

type State = {
  inputs: Inputs | null;
  results: PhysicsResults | null;
};

const initialState: State = {
  inputs: null,
  results: null,
};

const slice = createSlice({
  name: "windCalculator",
  initialState,
  reducers: {
    setInputs(state, action: PayloadAction<Inputs>) {
      state.inputs = action.payload;
    },

    calculateResults(state) {
      if (!state.inputs) return;
      const { radius, windSpeed, density, efficiency, cp } = state.inputs;
      const res = computeAll({
        radius,
        windSpeed,
        density,
        cp,
        efficiency,
      });
      state.results = res;
    },

    reset(state) {
      state.inputs = null;
      state.results = null;
    },
  },
});

export const { setInputs, calculateResults, reset } = slice.actions;
export default slice.reducer;


