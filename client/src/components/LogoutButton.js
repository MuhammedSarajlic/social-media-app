import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import Post from './Post'

const LogoutButton = () => {
    const { logout, user } = useAuth0()
  return (
    <>
        <div className='header'>
            <h1>logo</h1>
            <input type="text" placeholder='Search...'/>
            <div className='profile-options'>
                <p>{user.nickname}</p>
                <img src={user.picture} alt={user.name} />
                <button onClick={() => logout()}>
                    Log Out
                </button>
            </div>
        </div>
        <div className='main'>
            <div className='left-section'>
                <div className='add-post'>
                    <p>Add Post</p>
                    <input type="text" placeholder='Say something...'/>
                    <button>Post</button>
                </div>
                <div className='posts'>
                    <Post user={user}/>
                </div>
            </div>
            <div className='right-section'>
                <p>friends</p>
            </div>
        </div>
    </>
  )
}

export default LogoutButton