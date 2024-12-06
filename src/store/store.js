import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slice/Userslice'


export const store = configureStore({
  reducer: {
    user:userSlice.reducer
  },
})

export default store