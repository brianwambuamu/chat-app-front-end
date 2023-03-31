// import React, {useContext, useRef, useState} from "react";
// import { userDetails } from "./UserDetailsContextProvider";
// // import "../css/chat.css"

// function Chat({message}){
//     const [currentState, setCurrentState] = useState({messageContent: message.content, editing: false})
//     const messageContainerRef = useRef(null)
//     const {me} = useContext(userDetails)

//     function handleOnClick(e){
//         const optionsDiv = e.target.parentElement.querySelector('.options')
//         optionsDiv.classList.toggle("display-none")
//     }

//     function handleMessageChange(e){
//         setCurrentState(currentState => ({...currentState, messageContent: e.target.value}))
//     }

//     function handleEdit(){
//         const messageEditForm = messageContainerRef.current.querySelector('form')

//         const messageBeingEdited = messageContainerRef.current.querySelector('.content.sent')
//         messageBeingEdited.classList.add("display-none")

//         messageEditForm.classList.remove('display-none')
        
//         setCurrentState(currentState => ({ ...currentState, editing: !currentState.editing }))
//     }

//     function goBack(e){
//         setCurrentState(currentState => ({ ...currentState, editing: !currentState.editing }))

//         resetDisplayedItems()
//         setCurrentState(currentState => ({ ...currentState, messageContent: message.content }))

//     }

//     function resetDisplayedItems(){
//         messageContainerRef.current.querySelector('form').classList.add('display-none')
//         messageContainerRef.current.querySelector('.message .options').classList.add('display-none')
//         messageContainerRef.current.querySelector('.content.sent').classList.remove('display-none')
//     }

//     function handleDelete(){
//         fetch(`/messages/${message.id}`, {
//             method: 'DELETE',
//             headers: {"Content-Type": "application/json", "Accept": "application/json"},
//         })
//     }

//     function updateMessage(){

//         fetch(`/messages/${message.id}`, {
//             method: 'PATCH',
//             headers: { "Content-Type": "application/json", "Accept": "application/json" },
//             body: JSON.stringify({content: currentState.messageContent})
//         })
//             .then(res => {
//                 if (res.status === 200) {
//                     res.json().then(data => {
//                         console.log({ content: currentState.messageContent })
//                         setCurrentState(currentState => ({ ...currentState, editing: !currentState.editing }))
//                         resetDisplayedItems()
//                     })
//                 }
//             })
//     }

//     function submitEdit(e){
//         e.preventDefault()
//         updateMessage()
//     }

//     function submitFromSendButton(){
//         updateMessage()
//     }

//     return (
//         <div ref={messageContainerRef} className="message-container">
//             <div className="message">
//                 <div className={message.sender === me.id? "sending": "receiving"}>
//                     <div className="dummy-before"></div>
//                     <div>
//                         <div className="content sent" onClick={handleOnClick}>{currentState.messageContent}</div>

//                         <form className="display-none" onSubmit={submitEdit}>
//                             <input
//                                 type="text"
//                                 className="content"
//                                 onChange={handleMessageChange}
//                                 value={currentState.messageContent}></input>
//                         </form>

//                         <div className="options display-none">
//                             <button
//                                 className="back-delete"
//                                 onClick={currentState.editing? ()=>goBack(): ()=>handleDelete()}>
//                                     {currentState.editing? "Back": "Delete"}
//                             </button>

//                             <button
//                                 className="edit"
//                                 onClick={currentState.editing ? () => submitFromSendButton() : () => handleEdit()}>
//                                     {currentState.editing? "Send": "Edit"}
//                             </button>
//                         </div>
//                     </div>
//                     <div className="dummy-after"></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Chat


import React, { useContext, useRef, useState } from "react";
import { userDetails } from "./UserDetailsContextProvider";

function Chat({ message }) {
  const [currentState, setCurrentState] = useState({
    messageContent: message.content,
    editing: false,
  });
  const messageContainerRef = useRef(null);
  const { me } = useContext(userDetails);

  function handleOnClick(e) {
    const optionsDiv = e.target.parentElement.querySelector(".options");
    optionsDiv.classList.toggle("hidden");
  }

  function handleMessageChange(e) {
    setCurrentState((currentState) => ({
      ...currentState,
      messageContent: e.target.value,
    }));
  }

  function handleEdit() {
    const messageEditForm = messageContainerRef.current.querySelector(
      "form"
    );

    const messageBeingEdited = messageContainerRef.current.querySelector(
      ".content.sent"
    );
    messageBeingEdited.classList.add("hidden");

    messageEditForm.classList.remove("hidden");

    setCurrentState((currentState) => ({
      ...currentState,
      editing: !currentState.editing,
    }));
  }

  function goBack(e) {
    setCurrentState((currentState) => ({
      ...currentState,
      editing: !currentState.editing,
    }));

    resetDisplayedItems();
    setCurrentState((currentState) => ({
      ...currentState,
      messageContent: message.content,
    }));
  }

  function resetDisplayedItems() {
    messageContainerRef.current.querySelector("form").classList.add("hidden");
    messageContainerRef.current
      .querySelector(".message .options")
      .classList.add("hidden");
    messageContainerRef.current
      .querySelector(".content.sent")
      .classList.remove("hidden");
  }

  function handleDelete() {
    fetch(`/messages/${message.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
  }

  function updateMessage() {
    fetch(`/messages/${message.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ content: currentState.messageContent }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log({ content: currentState.messageContent });
          setCurrentState((currentState) => ({
            ...currentState,
            editing: !currentState.editing,
          }));
          resetDisplayedItems();
        });
      }
    });
  }

  function submitEdit(e) {
    e.preventDefault();
    updateMessage();
  }

  function submitFromSendButton() {
    updateMessage();
  }

  return (
    <div ref={messageContainerRef} className="message-container">
      <div className="message">
        <div className={message.sender === me.id ? "flex-row-reverse" : "flex-row"}>
          <div className="dummy-before"></div>
          <div>
            <div className="content sent p-2 rounded-lg shadow-md bg-green-400 text-white cursor-pointer hover:bg-green-500" onClick={handleOnClick}>
              {currentState.messageContent}
            </div>

            <form className="hidden" onSubmit={submitEdit}>
              <input
                type="text"
                className="content p-2 rounded-lg shadow-md bg-green-400 text-white"
                onChange={handleMessageChange}
                value={currentState.messageContent}
              ></input>
            </form>

            <div className="options hidden mt-1 flex justify-end">
              <button
                className="back-delete p-1 px-2 rounded-md-justify-center bg-red-400 hover:bg-red-500 text-white mr-2"
                onClick={handleDelete}
                >
                Delete
                </button>
                <button
                             className="back-delete p-1 px-2 rounded-md justify-center bg-blue-400 hover:bg-blue-500 text-white"
                             onClick={handleEdit}
                           >
                Edit
                </button>
                </div>
                </div>
                <div className="dummy-after"></div>
                </div>
                </div>
                <div className="send-container flex justify-end">
    {currentState.editing ? (
      <div className="flex items-center">
        <button
          className="back-delete p-1 px-2 rounded-md justify-center bg-gray-400 hover:bg-gray-500 text-white mr-2"
          onClick={goBack}
        >
          Cancel
        </button>
        <button
          className="back-delete p-1 px-2 rounded-md justify-center bg-green-400 hover:bg-green-500 text-white"
          onClick={submitFromSendButton}
        >
          Save
        </button>
      </div>
    ) : (
      <div className="flex items-center">
        <button
          className="back-delete p-1 px-2 rounded-md justify-center bg-red-400 hover:bg-red-500 text-white mr-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="back-delete p-1 px-2 rounded-md justify-center bg-blue-400 hover:bg-blue-500 text-white"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    )}
  </div>
</div>
);
}

export default Chat;
