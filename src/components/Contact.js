// import React from "react";
// // import "../css/contact.css"

// function Contact({ contact, onChatWith, toggleItemToShow }){

//     function handleClick(){
//         toggleItemToShow()
//         onChatWith(contact.userId)
//     }
//     return (
//         <div className="contact" onClick={(e)=> handleClick() }>
//             <div className="status"></div>
//             <div className="full-name">
//                 <h1>{contact.fullName}</h1>
//             </div>
//             <div className="views">
//                 <div className="view-count">
//                     <p>3</p>
//                 </div>
//             </div>         
//         </div>
//     )
// }

// export default Contact


import React from "react";

function Contact({ contact, onChatWith, toggleItemToShow }) {
  function handleClick() {
    toggleItemToShow();
    onChatWith(contact.userId);
  }

  return (
    <div
      className="flex items-center justify-between p-4 rounded-md bg-green-400 cursor-pointer hover:bg-green-500"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="h-4 w-4 rounded-full bg-green-600 mr-2"></div>
        <h1 className="text-lg font-medium">{contact.fullName}</h1>
      </div>
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-green-500">
        <p className="text-sm font-medium">{contact.viewCount}</p>
      </div>
    </div>
  );
}

export default Contact;
