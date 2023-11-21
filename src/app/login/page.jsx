"use client"

import "./login.scss"
import Link from 'next/link';
import { login } from "../api/data";
import { useState } from "react";
import { coffeewebStorageKeys, coffeeweb_SetLocal } from "../LocalStorage";
import { useRouter } from 'next/navigation'

function page() {

  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleSubmit = async () => {
    const response = await login(userDetails)
    coffeeweb_SetLocal(coffeewebStorageKeys.userDetails, response)
    if (response) {
      router.push("/dashboard")
    }
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='form'>
          <div className='header'>Login</div>
          <div className='body'>
            <div>
              <label htmlFor="">username</label>
              <input type="text" name='username' placeholder="username" onChange={handleChange} value={userDetails.username} required />
            </div>
            <div>
              <label htmlFor="">password</label>
              <input type="password" name='password' placeholder="password" onChange={handleChange} value={userDetails.password} required />
            </div>
            <div>
              {/* <input type="hidden" name='profilePic' onChange={handleChange} value={userDetails.profilePic} /> */}
              <button onClick={handleSubmit}>Submit</button>
            </div>

          </div>
          <div className='footer'>Dont have an account? <Link href='/register'>Register</Link></div>


        </div>
      </div>
    </div>
  )
}

export default page