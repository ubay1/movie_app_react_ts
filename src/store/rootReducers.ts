import { combineReducers } from '@reduxjs/toolkit'
import detailMovieReducer from './detailMovie';
import testCallbackReducer from './testCallbackHook';

const rootReducer = combineReducers({
    detailMovie: detailMovieReducer,
    testCallback: testCallbackReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer