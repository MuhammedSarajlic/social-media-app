import React, { useEffect, useState } from 'react'
import Timestamp from 'react-timestamp'

const Post = ({ user, post }) => {
  const [liked, setLiked] = useState(false)
  const like = () => {
    setLiked(!liked)
  }

  const date = new Date(post.createdAt.seconds * 1000)

  return (
    <>
      <div className='post'>
        <div className='post-header'>
          <img src={post.user_avatar} alt='' />
          <div className='post-header-info'>
            <h5>{post.username}</h5>
            {/* <Timestamp date={date} options={{ twentyFourHour: true }} /> */}
            <p className='post-header-info-time'>
              <Timestamp relative date={date} />
            </p>
          </div>
        </div>
        <div className='post-header-desc'>
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
