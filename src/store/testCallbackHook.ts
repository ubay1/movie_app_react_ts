import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITestCallback {
  data: string;
}

const initialState: ITestCallback = {
  data: ''
}

const SetTestCallback = createSlice({
  name: 'testCallback',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ITestCallback>) {
      state.data = action.payload.data
    },
  },
})
export const { setData } = SetTestCallback.actions
export default SetTestCallback.reducer