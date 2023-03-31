// import React from "react";
// import MessageInputForm from "./MessageInputForm";
// import Chats from "./Chats";
// // import "../css/chats-container.css"

// function ChatsContainer({showChat, desktopView}){
//     return (
//         <div
//             className={desktopView? "chats-container desktop":
//                 !desktopView && showChat?
//                 "chats-container mobile": "display-none"}>
//             <Chats />
//             <MessageInputForm />
//         </div>
//     )
// }

// export default ChatsContainer

import React from "react";
import MessageInputForm from "./MessageInputForm";
import Chats from "./Chats";

function ChatsContainer({showChat, desktopView}) {
  return (
    <div
      className={
        desktopView
          ? "chats-container desktop"
          : !desktopView && showChat
          ? "chats-container mobile"
          : "display-none"
      }
    >
      <div className="flex-1 bg-green-500 flex flex-col justify-between">
        <Chats />
        <MessageInputForm />
      </div>
    </div>
  );
}

export default ChatsContainer;
