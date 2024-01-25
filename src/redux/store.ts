import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import reducer from './rootReducer'

export type RootState = ReturnType<typeof reducer>

const store = configureStore({
    reducer: reducer,
})

export type AppDispatch = typeof store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export default store