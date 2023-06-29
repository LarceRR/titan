import { MODAL_OPEN_STATE } from "../actions/actions";
import { createAction } from '@reduxjs/toolkit';

export const testAction = createAction(MODAL_OPEN_STATE);

export default function ModalReducer(state = {value:false}, action) {
  switch (action.type) {
    case MODAL_OPEN_STATE:
      return {value: !state.value}  
    default:
      return state
  }
}