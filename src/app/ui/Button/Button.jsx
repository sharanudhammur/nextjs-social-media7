"use client"
import { coffeewebStorageKeys, coffeeweb_GetLocal } from '@/app/LocalStorage';
import React from 'react'

function Button({ ...props }) {
    const { recieverId, requested } = props

    const followAction = async () => {
        let userDetails = coffeeweb_GetLocal(coffeewebStorageKeys.userDetails);
        const data = {
            senderId: userDetails._id,
            senderName: userDetails.username,
            senderImg: userDetails.profilePic,
            recieverId
        }
        const res = await fetch("/api/request", {
            method: "POST",
            body: JSON.stringify(data),
        });

        if (res.status === 200) {
            const data = await res.json();
            // router.push(`/posts/${data.slug}`);
        }
    };

    return (
        <div>
            {requested ? <button className='sbutton' onClick={followAction}>Requested</button> :
                <button className='pbutton' onClick={followAction}>Follow</button>}
        </div>

    )
}

export default Button