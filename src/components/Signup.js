// import React, {useState, useContext, useEffect} from "react";
// import {useNavigate} from 'react-router-dom'
// // import "../css/login-form.css"
// import { userDetails } from "./UserDetailsContextProvider";


// function Signup(){
//     const {setMe} = useContext(userDetails)
//     const defaultState = {
//         full_name: "",
//         email: "",
//         username: "",
//         password: "",
//         bio: "",
//         profile_picture: ""
//     }
//     const [userInfo, setUserInfo] = useState(defaultState)
//     const [submitting, setSubmitting] = useState(false)
//     const navigate = useNavigate()

//     // Go to home if in session even when one pastes the path GET /signup
//     useEffect(() => {
//         const localStorageMe = JSON.parse(localStorage.getItem("me"))

//         if(localStorageMe){
//             fetch(`/users/${localStorageMe.id}`)
//                 .then(res => {
//                     if (res.status === 200) {
//                         res.json().then(data => {
//                             localStorage.setItem("me", JSON.stringify(data))
//                             setMe(data)
//                             localStorage.setItem("allUsers", JSON.stringify([]))
//                             navigate('/home')
//                         })
//                     }
//                 })
//         }
//     }, [])

//     function handleInputChange(e){
//         setUserInfo(userInfo => ({...userInfo, [e.target.name]: e.target.value}))
//     }

//     function handleSubmit(e){
//         e.preventDefault()
//         setSubmitting(true)
        
//         fetch('/signup', {
//             method: 'POST',
//             headers: {"Content-Type": "application/json", "Accept": "application/json"},
//             body: JSON.stringify(userInfo)
//         })
//         .then(res => {
//             if(res.status === 201){
//                 res.json().then(data => {  
//                     setSubmitting(false)
//                     localStorage.setItem("me", JSON.stringify(data))
//                     localStorage.setItem("allUsers", JSON.stringify([]))
//                     localStorage.setItem("loggedIn", true)
//                     navigate('/home')
//                 })
//             }else if (res.status === 422){
//                 res.json().then(data => alert("Unable to sign in\n" + data.errors.join('\n')))
//             }else {
//                 alert("An error occurred. Try again later")
//             }
//             setSubmitting(false)
//         })
//     }

//     function goToLoginPage(){
//         navigate('/login')
//     }

//     return (
//         <div className="signup">
//             <div className="container">
//                 <form onSubmit={handleSubmit}>
//                     <div className="input">
//                         <label htmlFor="full_name">Full Name</label>
//                         <input
//                             type="text"
//                             name="full_name"
//                             placeholder="John Doe"
//                             value={userInfo.full_name}
//                             onChange={handleInputChange}
//                             required/>
//                     </div>

//                     <div className="input">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="johndoe@example.com"
//                             value={userInfo.email}
//                             onChange={handleInputChange}
//                             required />
//                     </div>

//                     <div className="input">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="johndoe"
//                             value={userInfo.username}
//                             onChange={handleInputChange}
//                             required />
//                     </div>

//                     <div className="input">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={userInfo.password}
//                             onChange={handleInputChange}
//                             required />
//                     </div>

//                     <div className="input">
//                         <label htmlFor="bio">Bio</label>
//                         <textarea
//                             name="bio"
//                             placeholder="Here for a good time"
//                             onChange={handleInputChange}
//                             value={userInfo.bio} />
//                     </div>

//                     <div className="input">
//                         <label htmlFor="profile_picture">Profile Picture</label>
//                         <input
//                             type="text"
//                             name="profile_picture"
//                             onChange={handleInputChange}
//                             value={userInfo.profile_picture} />
//                     </div>

//                     <div className="buttons">
//                         <button className="btn">{submitting? "Signing You Up..." : "Signup"}</button>
//                         <button className="btn" onClick={goToLoginPage}>Login</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "./UserDetailsContextProvider";

function Signup() {
  const { setMe } = useContext(userDetails);
  const defaultState = {
    full_name: "",
    email: "",
    username: "",
    password: "",
    bio: "",
    profile_picture: "",
  };
  const [userInfo, setUserInfo] = useState(defaultState);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageMe = JSON.parse(localStorage.getItem("me"));

    if (localStorageMe) {
      fetch(`/users/${localStorageMe.id}`).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            localStorage.setItem("me", JSON.stringify(data));
            setMe(data);
            localStorage.setItem("allUsers", JSON.stringify([]));
            navigate("/home");
          });
        }
      });
    }
  }, []);

  function handleInputChange(e) {
    setUserInfo((userInfo) => ({ ...userInfo, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    fetch("https://chat-app-back-end-qd27.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(userInfo),
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((data) => {
          setSubmitting(false);
          localStorage.setItem("me", JSON.stringify(data));
          localStorage.setItem("allUsers", JSON.stringify([]));
          localStorage.setItem("loggedIn", true);
          navigate("/home");
        });
      } else if (res.status === 422) {
        res.json().then((data) => alert("Unable to sign in\n" + data.errors.join("\n")));
      } else {
        alert("An error occurred. Try again later");
      }
      setSubmitting(false);
    });
  }

  function goToLoginPage() {
    navigate("/login");
  }

  return (
    <div id="signup-container" class="signup bg-gray-100 min-h-screen flex items-center justify-center">
  <div class=" container mx-auto max-w-md bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
    <form onSubmit={handleSubmit} class="bg-white p-6 rounded-lg shadow-lg opacity-80 backdrop-filter backdrop-blur-lg">
          <div className="mb-4">
            <label htmlFor="full_name" className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="John Doe"
              value={userInfo.full_name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-400 p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              value={userInfo.email}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-400 p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              value={userInfo.username}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-400 p-2 rounded-lg"
              />
              </div>
              <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={userInfo.password}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          placeholder="Write something about yourself"
          value={userInfo.bio}
          onChange={handleInputChange}
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="profile_picture" className="block text-gray-700 font-bold mb-2">
          Profile Picture URL
        </label>
        <input
          type="text"
          name="profile_picture"
          placeholder="https://example.com/picture.jpg"
          value={userInfo.profile_picture}
          onChange={handleInputChange}
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" onClick={goToLoginPage} className="text-gray-600 font-bold py-2 px-4">
          Login
        </button>
      </div>
    </form>
  </div>
</div>
);
}

export default Signup;

