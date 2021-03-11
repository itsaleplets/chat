import { 
  INPUT_SUCCESS,
  INPUT_FAIL,
  REPLY_FAIL,
  REPLY_SUCCESS,
  FORM_FAIL,
  FORM_SUCCESS,
} from '../actions/types';

const initialState = {
  messages: [{
    message: 'Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.',
    type: "bot"
  }]
};

const chatnilson = (state = initialState, action) => {
  const { type, payload} = action;
  let { messages } = state;

  switch(type) {
    case INPUT_SUCCESS:
      messages = [...messages, {message: payload, type:"user" }]
      return {
        ...state,
        messages,
      }
    case INPUT_FAIL:
      return {
        ...state,
      }
    case REPLY_SUCCESS:
      messages = [...messages, { message: payload, type: "bot" }];
      return {
        ...state,
        messages,
      };
    case REPLY_FAIL:
      return {
        ...state,
      };
    case FORM_SUCCESS:
      messages = [{ message: payload, type: "bot" }];
      return {
        // ...state,
        messages,
      };
    case FORM_FAIL:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      }
  }
}

export default chatnilson;