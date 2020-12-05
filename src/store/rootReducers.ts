import { combineReducers } from '@reduxjs/toolkit'
import detailMovieReducer  from './detailMovie';

const rootReducer = combineReducers({
    detailMovie: detailMovieReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer