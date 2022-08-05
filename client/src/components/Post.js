import React, { useEffect, useState } from 'react'

const Post = ({ user, post }) => {
  const [liked, setLiked] = useState(false)
  const like = () => {
    setLiked(!liked)
  }

  return (
    <>
      <div className='post'>
        <div className='post-header'>
          <img src={user.picture} alt='' />
          <div className='post-header-info'>
            <h5>{user.nickname}</h5>
            <p className='post-header-info-time'>{Date().slice(16, 21)}</p>
          </div>
        </div>
        <div className='post-header-desc'>
          {/* <p>Ovo je description posta</p> */}
          <p>{post.description}</p>
        </div>
        <div className='post-main'>
          <img src={post.image} alt='' />
        </div>
        <div className='post-footer'>
          <div className='interaction-numbers'>
            <p>1 Likes</p>
            <p>1 Comment</p>
          </div>
          <div className='interaction-buttons'>
            <button onClick={like} className={liked ? 'liked' : ''}>
              Like
            </button>
            <button>Comment</button>
            <button>Share</button>
          </div>
          <div className='comment-section'>
            <img src={user.picture} alt='Alt' />
            <input type='text' placeholder='Comment...' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
