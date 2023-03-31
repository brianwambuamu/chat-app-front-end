// import React, {useContext} from "react";
// import { userDetails } from "./UserDetailsContextProvider";
// // import "../css/now-chatting.css"

// function NowChatting({desktopView}){
//     const {me, they} = useContext(userDetails)

//     function shortenBio(bio){
//         if(!bio){
//             return
//         }
        
//         if(bio.length > 40){
//             return bio.split("").slice(0, 40).join("") + "..."
//         }else {
//             return bio
//         }
//     }

//     return (
//         <div className="now-chatting container">
//             <div className="details they">
//                 <img src={they? they.profile_picture: me.profile_picture} alt={they? they.full_name: me.full_name}/>
//                 <div className="they-details">
//                     <h1>{they? they.full_name: me.full_name}</h1>
//                     <p>{they ? shortenBio(they.bio): me.bio}</p>
//                 </div>
//             </div>

//             <div className={desktopView ? "details me desktop-view": "display-none"}>
//                 <div className="me-details">
//                     <h1>{me.full_name} (You)</h1>
//                     <p>{shortenBio(me.bio)}</p>                
//                 </div>
//                 <img src={me.profile_picture} alt={me.full_name} />
//             </div>
//         </div>
//     )
// }

// export default NowChatting


import React, {useContext} from "react";
import {userDetails} from "./UserDetailsContextProvider";

function NowChatting({desktopView}) {
  const {me, they} = useContext(userDetails);

  function shortenBio(bio) {
    if (!bio) {
      return;
    }

    if (bio.length > 40) {
      return bio.split("").slice(0, 40).join("") + "...";
    } else {
      return bio;
    }
  }

  return (
    <div className="now-chatting container bg-green-200 rounded-md p-4">
      <div className="details they flex items-center">
        <img
          src={they ? they.profile_picture : me.profile_picture}
          alt={they ? they.full_name : me.full_name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="they-details">
          <h1 className="text-lg font-medium text-gray-800">
            {they ? they.full_name : me.full_name}
          </h1>
          <p className="text-sm text-gray-600">
            {they ? shortenBio(they.bio) : me.bio}
          </p>
        </div>
      </div>

      <div className={desktopView ? "details me desktop-view flex items-center" : "display-none"}>
        <div className="me-details">
          <h1 className="text-lg font-medium text-gray-800">
            {me.full_name} (You)
          </h1>
          <p className="text-sm text-gray-600">{shortenBio(me.bio)}</p>
        </div>
        <img src={me.profile_picture} alt={me.full_name} className="w-10 h-10 rounded-full ml-4" />
      </div>
    </div>
  );
}

export default NowChatting;
