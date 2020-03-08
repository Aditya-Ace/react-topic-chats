import React, { useReducer, createContext } from "react";

export const ChatContext = createContext();

const initialState = {
  general: [
    { from: "Jim", msg: "Hello World!" },
    { from: "Jack", msg: "Hello Everyone!" },
    { from: "John", msg: "How you all doin?" }
  ],
  music: [
    { from: "Aaron", msg: "I love music" },
    { from: "Ace", msg: "Music is Life" },
    { from: "Apple", msg: "EDM is my favorite" }
  ],
  horror: [
    { from: "Ancient_Ones", msg: "You are a monster" },
    { from: "Sub Zero", msg: "I am the Killer" },
    { from: "Kapler", msg: "Die bitches!" }
  ]
};

const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MSG":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
};

const Store = props => {
  const reducerHook = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={reducerHook}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default Store;
