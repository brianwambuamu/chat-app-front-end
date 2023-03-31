// import React, {useState, useContext, useEffect} from "react";
// import { useNavigate } from 'react-router-dom'
// import { userDetails } from './UserDetailsContextProvider'
// // import "../css/login-form.css"

// function Login() {
//     const defaultState = {
//         username: "",
//         password: ""
//     }
//     const [userInfo, setUserInfo] = useState(defaultState)
//     const [submitting, setSubmitting] = useState(false)
//     const navigate = useNavigate()

//     // Go to home if in session even when one pastes the path GET /login
//     useEffect(()=>{
//         const localStorageMe = JSON.parse(localStorage.getItem("me"))

//         if(localStorageMe){
//             fetch(`/users/${localStorageMe.id}`, {mode: 'cors'})
//             .then(res => {
//                 if(res.status === 200){
//                     res.json().then(data => {
//                         localStorage.setItem("me", JSON.stringify(data))
//                         navigate('/home')
//                     })
//                 }
//             })
//         }

//     }, [])

//     function handleInputChange(e) {
//         setUserInfo(userInfo => ({ ...userInfo, [e.target.name]: e.target.value }))
//     }

//     function login(){
//         fetch('/login', {
//             method: 'POST',
//             headers: { "Content-Type": "application/json", "Accept": "application/json" },
//             body: JSON.stringify(userInfo)
//         })
//             .then(res => {
//                 if (res.status === 200) {
//                     res.json().then(data => {
//                         setSubmitting(false)
//                         localStorage.setItem("me", JSON.stringify(data))
//                         localStorage.setItem("allUsers", JSON.stringify([]))
//                         localStorage.setItem("loggedIn", true)
//                         navigate('/home')
//                     })
//                 } else if (res.status === 401) {
//                     alert("Invalid username or password!")
//                 } else {
//                     alert("An error occurred. Try again later")
//                 }
//                 setSubmitting(false)
//             })  
//     }

//     function handleSubmit(e) {
//         e.preventDefault()
//         setSubmitting(true)
//         login()
//     }

//     function goToSignupPage(){
//         navigate('/signup')
//     }

//     return (
//         <div className="login">
//             <div className="container">
//                 <form onSubmit={handleSubmit}>
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

//                     <div className="buttons">
//                         <button className="btn">{submitting? "Logging You In..." : "Login"}</button>
//                         <button className="btn" onClick={goToSignupPage}>Signup</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login



import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { userDetails } from "./UserDetailsContextProvider";

function Login() {
  const defaultState = {
    username: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(defaultState);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Go to home if in session even when one pastes the path GET /login
  useEffect(() => {
    const localStorageMe = JSON.parse(localStorage.getItem("me"));

    if (localStorageMe) {
      fetch(`https://chat-app-back-end-qd27.onrender.com/users/${localStorageMe.id}`, { mode: "cors" }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            localStorage.setItem("me", JSON.stringify(data));
            navigate("/home");
          });
        }
      });
    }
  }, []);

  function handleInputChange(e) {
    setUserInfo((userInfo) => ({ ...userInfo, [e.target.name]: e.target.value }));
  }

  function login() {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(userInfo),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setSubmitting(false);
          localStorage.setItem("me", JSON.stringify(data));
          localStorage.setItem("allUsers", JSON.stringify([]));
          localStorage.setItem("loggedIn", true);
          navigate("/home");
        });
      } else if (res.status === 401) {
        alert("Invalid username or password!");
      } else {
        alert("An error occurred. Try again later");
      }
      setSubmitting(false);
    });
  }



  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    login();
  }

  function goToSignupPage() {
    navigate("/signup");
  }

  return (
    <div id = "login-container"className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-screen">
    {/* <video autoplay muted loop className="fixed top-0 left-0 w-full h-full object-cover">
      <source src="/src/Assets/video1.mp4" type="video/mp4" />
    </video> */}
   <h1 className="text-9xl font-bold mb-8 heartbeat" style={{color: '#075e54'}}>Chattier</h1>

    <div className="max-w-md w-full space-y-8 relative z-10">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" style={{color: '#075e54'}}>Sign in to your account</h2>
      </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={userInfo.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={userInfo.password}
                onChange={handleInputChange}
                />
                </div>
                </div>
                <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-black-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
        <button type="button" onClick={goToSignupPage} className="font-medium text-green-500 hover:text-green-600">
  Don't have an account yet?
</button>

        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {submitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm10 0a2 2 0 100-4 2 2 0 000 4z"
                ></path>
              </svg>
            </span>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </div>
    </form>
  </div>
</div>
);
}

export default Login;



