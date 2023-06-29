import ModalReducer from "../reducers/testReducer";
import { configureStore } from '@reduxjs/toolkit';
import { preloadedState } from "../states";

const reducer = {
  Modal: ModalReducer,
}

export const store = configureStore({
  reducer,
  preloadedState
})