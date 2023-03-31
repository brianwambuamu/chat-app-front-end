// import React, {useState, useContext, useEffect} from "react";
// import { userDetails } from "./UserDetailsContextProvider";
// // import "../css/search-user.css"

// function SearchUser({ onChatWith, toggleItemToShow, clientHeight }){
//     const {allUsers} = useContext(userDetails)
//     const [user, setUser] = useState("")
//     const [matchedUsers, setMatchedUsers] = useState(
//         allUsers ? allUsers.slice(0, maxUsersToShow()): [])

//     useEffect(()=>{
//         fetch('/users')
//         .then(res => {
//             if(res.status === 200){
//                 res.json().then(data => {
//                     setMatchedUsers(data.slice(0, maxUsersToShow()))
//                 })
//             }
//         })
//     }, [])

//     function handleChange(e){
//         setUser(e.target.value)
//         setMatchedUsers(allUsers.filter(user => user.username.includes(e.target.value)).slice(0, maxUsersToShow()))
//     }

//     function handleSubmit(e){
//         e.preventDefault()
//         setUser("")
//     }

//     function maxUsersToShow(){
//         return parseInt((clientHeight - 400) / 50)
//     }

//     return (
//         <div className="search-user" >
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="content">Search User</label>
//                 <input onChange={handleChange} name="content" value={user} placeholder="search by username"/>
//             </form>
//             <div className="matched-users">
//                 {
//                     matchedUsers.map(user => (
//                         <div key={user.id} className="full-name" onClick={()=>onChatWith(user.id)}>
//                             <div onClick={toggleItemToShow} >
//                                 <p>{user.full_name}</p><p>@{user.username}</p>
//                             </div>
//                         </div>
//                     )).slice(0, maxUsersToShow())
//                 }
//             </div>
//         </div>
//     )
// }

// export default SearchUser


import React, {useState, useContext, useEffect} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchUser({ onChatWith, toggleItemToShow, clientHeight }) {
  const {allUsers} = useContext(userDetails)
  const [user, setUser] = useState("")
  const [matchedUsers, setMatchedUsers] = useState(
      allUsers ? allUsers.slice(0, maxUsersToShow()): []
  )

  useEffect(()=>{
      fetch('/users')
      .then(res => {
          if(res.status === 200){
              res.json().then(data => {
                  setMatchedUsers(data.slice(0, maxUsersToShow()))
              })
          }
      })
  }, [])

  function handleChange(e){
      setUser(e.target.value)
      setMatchedUsers(allUsers.filter(user => user.username.includes(e.target.value)).slice(0, maxUsersToShow()))
  }

  function handleSubmit(e){
      e.preventDefault()
      setUser("")
  }

  function maxUsersToShow(){
      return parseInt((clientHeight - 400) / 50)
  }

  return (
      <div className="search-user bg-green-600 rounded-md p-4">
          <form onSubmit={handleSubmit} className="flex items-center mb-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-300 mr-2" />
              <input 
                  onChange={handleChange} 
                  name="content" 
                  value={user} 
                  placeholder="Search by username"
                  className="w-full bg-transparent text-gray-300 focus:outline-none"
              />
          </form>
          <div className="matched-users">
              {
                  matchedUsers.map(user => (
                      <div key={user.id} className="full-name cursor-pointer" onClick={()=>onChatWith(user.id)}>
                          <div onClick={toggleItemToShow} className="flex justify-between items-center">
                              <p className="text-white font-medium">{user.full_name}</p><p className="text-gray-300">@{user.username}</p>
                          </div>
                      </div>
                  )).slice(0, maxUsersToShow())
              }
          </div>
      </div>
  )
}

export default SearchUser

