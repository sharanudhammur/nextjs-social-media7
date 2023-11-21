"use client"
import React, { useEffect, useState } from 'react'
import "./Aside.scss"
import { sendRequest } from '@/app/api/actions'
import { FaCirclePlus } from "react-icons/fa6";
import { coffeewebStorageKeys, coffeeweb_GetLocal } from '@/app/LocalStorage';
import Button from '../Button/Button';

const Aside = () => {

  const [allUsers, setAllUsers] = useState([])
  const [followRequest, setFollowRequest] = useState([])

  useEffect(() => {
    let userDetails = coffeeweb_GetLocal(coffeewebStorageKeys.userDetails);
    getAllUsers(userDetails)
    getAllFriendRequests(userDetails)
  }, [])

  const getAllUsers = async (userDetails) => {
    const res = await fetch(`/api/getalluser/${userDetails?._id}`, {
      cache: "no-store",
    });
    try {
      const result = await res.json()
      setAllUsers(result.returnLst)
    }
    catch (err) {
      console.log(err)
    }
  };

  const getAllFriendRequests = async (userDetails) => {
    console.log(userDetails)
    const res = await fetch(`/api/request/${userDetails._id}`, {
      cache: "no-store"
    });
    try {
      const result = await res.json()
      setFollowRequest(result.returnLst)
    }
    catch (err) {
      console.log(err)
    }
  };

  // const followAction = async () => {
  //   const data = {
  //     user: "hello"
  //   }
  //   const res = await fetch("/api/request", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });

  //   if (res.status === 200) {
  //     const data = await res.json();
  //     // router.push(`/posts/${data.slug}`);
  //   }
  // };

  return (
    <div className='aside'>
      <div className='container'>
        <div className='cards'>
          <div className='request p15 hr'>All Users</div>
          <div className='chat_list'>
            {allUsers?.map((ele,index) => {
              return (
                <div className='hr p10' key={index}>
                  <div className='chat'>
                    <div className="profile_pic_no_wrapper">
                      <img src={ele?.profilePic} />
                    </div>

                    <div className='user_name'>
                      <div className='name'>{ele.username}</div>
                      <div className='actions'>
                        <Button recieverId={ele._id} requested={ele.requested} />
                        {/* <button className='pbutton' onClick={followAction}>Follow</button> */}
                        {/* <button className='sbutton'>Delete</button> */}
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}

          </div>
        </div>

        <div className='cards'>
          <div className='request p15 hr'>Friend Requests</div>
          <div className='chat_list'>
            {followRequest?.map((ele,index) => {
              return (
                <div className='hr p10' key={index}>
                  <div className='chat'>
                    <div className="profile_pic_no_wrapper">
                      <img src={ele?.senderImg} />
                    </div>

                    <div className='user_name'>
                      <div className='name'>{ele.senderName}</div>
                      <div className='actions'>
                        <button className='pbutton'>Accept</button>
                        <button className='sbutton'>Delete</button>
                        {/* <button className='pbutton' onClick={()=>sendRequest(ele.id)}><FaCirclePlus/></button> */}
                        {/* <form action={sendRequest}>
                          <input type="hidden" name="senderId" value={(ele._id)} />
                          <input type="hidden" name="receiverId" value={(userDetails?._id)} />
                          <button>
                            <FaCirclePlus />
                          </button>
                        </form> */}
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Aside