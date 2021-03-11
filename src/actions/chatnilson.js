import { 
  INPUT_SUCCESS,
  INPUT_FAIL,
  REPLY_FAIL,
  REPLY_SUCCESS,
  FORM_FAIL,
  FORM_SUCCESS,
} from './types';
import axios from 'axios';

export const userMessage = (message) => async (dispatch) => {
  try {
    dispatch({type: INPUT_SUCCESS, payload: message})
  } catch(err) {
    dispatch({ type: INPUT_FAIL});
  }
};

export const botMessage = (reply) => async (dispatch) => {
  try {
    dispatch({ type: REPLY_SUCCESS, payload: reply });
  } catch(err) {
    dispatch({ type: REPLY_FAIL});
  }
}

export const sendFormInfo = (info) => async (dispatch) => {
  try {
    const body = { input: info }
    const res = await axios.post('https://6046bd18f0c6dc00177b22d7.mockapi.io/api/form', body)
    dispatch({ type: FORM_SUCCESS, payload: res.data.message });
  } catch(err) {
    dispatch({ type: FORM_FAIL });
  }
}
