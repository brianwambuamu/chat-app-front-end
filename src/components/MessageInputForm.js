// import React, {useState, useContext} from "react";
// import { userDetails } from "./UserDetailsContextProvider";
// // import "../css/message-input-form.css"

// function MessageInputForm(){
//     const { me, they, setMessages} = useContext(userDetails)
//     const senderAndReceiver = {sender: me ? me.id : "", receiver: they? they.id : ""}
//     const [sending, setSending] = useState(false)
//     const [messageContent, setMessageContent] = useState("")

//     function updateMessages(newMessage){
//         fetch('/messages', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
//             body: JSON.stringify(newMessage)
//         })
//             .then(res => {
//                 if (res.status === 201) {
//                     res.json().then(data => {
//                         setSending(false)
//                         setMessageContent("")
//                     })
//                 }
//             })
//     }

//     function handleSubmit(e){
//         e.preventDefault()
//         setSending(true)
//         if(me && they){
//             updateMessages({...senderAndReceiver, content: messageContent})
//         }
//     }

//     function handleChange(e){
//         setMessageContent(e.target.value)
//     }


//     return (
//         <div className="message-input">
//             <form onSubmit={handleSubmit}>
//                 <input onChange={handleChange} name="content" value={messageContent} placeholder="type your message here"/>
//                 <button className="btn">{sending? "Sending..." : "Send"}</button>
//             </form>
//         </div>
//     )
// }

// export default MessageInputForm



import React, { useState, useContext } from "react";
import { userDetails } from "./UserDetailsContextProvider";

function MessageInputForm() {
  const { me, they, setMessages } = useContext(userDetails);
  const senderAndReceiver = { sender: me ? me.id : "", receiver: they ? they.id : "" };
  const [sending, setSending] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  function updateMessages(newMessage) {
    fetch('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(newMessage)
    })
      .then(res => {
        if (res.status === 201) {
          res.json().then(data => {
            setSending(false)
            setMessageContent("")
          })
        }
      })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    if (me && they) {
      updateMessages({ ...senderAndReceiver, content: messageContent });
    }
  }

  function handleChange(e) {
    setMessageContent(e.target.value);
  }

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-green-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            onChange={handleChange}
            name="content"
            value={messageContent}
            placeholder="Type your message here"
          />
          <button
            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInputForm;
