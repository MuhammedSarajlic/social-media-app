import React from 'react'

const Post = ({ user }) => {
  return (
    <>
        <div className='post'>
            <div className='post-header'>
                <img src={user.picture} alt="" />
                <div className='post-header-info'>
                    <h5>{user.nickname}</h5>
                    <p className='post-header-info-time'>{Date().slice(16,21)}</p>
                </div>
            </div>
            <div className='post-main'>
                <img src={'https://w0.peakpx.com/wallpaper/945/890/HD-wallpaper-bmw-m4-car-coupe-f82-modified-orange-tuning-vehicle.jpg'} alt="" />
            </div>
            <div className='post-footer'>
                <div className='interaction-buttons'>
                    <button>Like</button>
                    <button>Comment</button>
                    <button>Share</button>
                </div>
                <div className='comment-section'>
                    <img src={user.picture} alt="" />
                    <input type="text" placeholder='Comment...'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Post