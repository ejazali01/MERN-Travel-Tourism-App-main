import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packageCount : 0
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    addPackageCount: (state, action) => {
      state.packageCount = action.payload;
    },
  },
});

export const {
    addPackageCount,
} = packageSlice.actions;

export default packageSlice.reducer;
