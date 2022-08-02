import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

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
                    <div className='post'>
                        <div className='post-header'>
                            <img src={user.picture} alt="" />
                            <div className='post-header-info'>
                                <h5>{user.nickname}</h5>
                                <p className='post-header-info-time'>{Date.now()}</p>
                            </div>
                        </div>
                        <div className='post-main'>
                            <img src={'https://w0.peakpx.com/wallpaper/945/890/HD-wallpaper-bmw-m4-car-coupe-f82-modified-orange-tuning-vehicle.jpg'} alt="" />
                        </div>
                        <div className='post-footer'>
                            <p>like</p>
                            <p>Comment</p>
                            <div className='comment-section'>
                                <input type="text" placeholder='Comment...'/>
                            </div>
                        </div>
                    </div>
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