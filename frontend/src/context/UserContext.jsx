/* eslint-disable react/prop-types */

// import axios from "axios";
import { createContext,  } from "react";
import { useReducer } from "react";


export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      console.log(action.payload);
      console.log("e finally enter")
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      console.log("e reach here")
      return { ...state, userInfo: null };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
