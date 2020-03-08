import React, { useReducer, createContext } from "react";
import io from "socket.io-client";

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
let socket;
function sendChatAction(value) {
  socket.emit("chat message", value);
}
function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initialState);
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MSG", payload: msg });
    });
  }
  const user = "aditya" + Math.floor(Math.random(100) * 10000);

  return (
    <ChatContext.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </ChatContext.Provider>
  );
}

export default Store;
