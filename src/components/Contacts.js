// import React, {useState, useContext, useEffect} from "react";
// import { userDetails } from "./UserDetailsContextProvider";
// import Contact from "./Contact"
// import SearchUser from "./SearchUser";
// // import "../css/contacts.css"

// function Contacts({onChatWith, showContacts, desktopView, toggleItemToShow, clientHeight}){
//     const {me} = useContext(userDetails)
//     const [contacts, setContacts] = useState([])

//     useEffect(() => {
//         if (me.messages) {
//             setContacts(() => {
//                 let contactArray = createContacts(me.messages)
//                 contactArray = filterOut(contactArray, me)
//                 contactArray = uniqueContacts(contactArray)
//                 return contactArray
//             })
//         }
//     }, [me ])

//     function uniqueContacts(contactArray){
//         let existingContactIds = []
//         return contactArray.filter(contact => {
//             if (!existingContactIds.includes(contact.userId) && contact.userId !== me.id){
//                 existingContactIds.push(contact.userId)
//                 return true
//             }else{
//                 return false
//             }
//         })
//     }

//     function filterOut(contacts, me){
//         return contacts.filter(message => message.userId !== me.id)
//     }

//     function createContacts(messages){
//         const contacts = messages.map(message => {
//                 if (message.receiver === me.id) {
//                     return {
//                         fullName: message.sender_full_name,
//                         username: message.sender_username,
//                         userId: message.sender
//                     }
//                 } else {
//                     return {
//                         fullName: message.receiver_full_name,
//                         username: message.receiver_username,
//                         userId: message.receiver
//                     }
//                 }
//             })

//         return contacts
//     }

//     const contactComponents = contacts.map(
//         contact => <Contact key={contact.userId} contact={contact} toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} />
//     )

//     return (
//         <div className={desktopView ? "contacts" :
//             showContacts && !desktopView ?
//                 "contacts mobile" : "display-none"}>
//             {contactComponents.slice(0, parseInt(document.documentElement.clientHeight / 200))}

//             <SearchUser toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} clientHeight={clientHeight}/>
//         </div>
//     )
// }

// export default Contacts


import React, { useState, useContext, useEffect } from "react";
import { userDetails } from "./UserDetailsContextProvider";
import Contact from "./Contact"
import SearchUser from "./SearchUser";

function Contacts({ onChatWith, showContacts, desktopView, toggleItemToShow, clientHeight }) {
  const { me } = useContext(userDetails);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
            if (me.messages) {
                setContacts(() => {
                    let contactArray = createContacts(me.messages)
                    contactArray = filterOut(contactArray, me)
                    contactArray = uniqueContacts(contactArray)
                    return contactArray
                })
            }
        }, [me ])

  function uniqueContacts(contactArray) {
    let existingContactIds = []
    return contactArray.filter(contact => {
      if (!existingContactIds.includes(contact.userId) && contact.userId !== me.id) {
        existingContactIds.push(contact.userId)
        return true
      } else {
        return false
      }
    })
  }

  function filterOut(contacts, me) {
    return contacts.filter(message => message.userId !== me.id)
  }

  function createContacts(messages) {
    const contacts = messages.map(message => {
      if (message.receiver === me.id) {
        return {
          fullName: message.sender_full_name,
          username: message.sender_username,
          userId: message.sender
        }
      } else {
        return {
          fullName: message.receiver_full_name,
          username: message.receiver_username,
          userId: message.receiver
        }
      }
    })

    return contacts
  }

  const contactComponents = contacts.map(
    contact => <Contact key={contact.userId} contact={contact} toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} />
  )

  return (
    <div className={desktopView ? "contacts bg-green-600 w-1/3 h-full" :
      showContacts && !desktopView ?
        "contacts mobile bg-green-600 w-full h-full absolute inset-y-0 right-0" : "display-none"}>
      <div className="flex items-center justify-between bg-green-700 px-6 py-3">
        <h2 className="text-xl text-white font-bold">Contacts</h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={toggleItemToShow}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="h-full overflow-auto">
        {contactComponents.slice(0, parseInt(document.documentElement.clientHeight / 200))}
      </div>
      <SearchUser toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} clientHeight={clientHeight} />
    </div>
  )
}

export default Contacts;
