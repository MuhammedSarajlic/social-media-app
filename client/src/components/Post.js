import { doc, deleteDoc, getDocs, query, orderBy, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import Timestamp from 'react-timestamp'
import { db } from './Firebase'

const Post = ({ user, post, imageUrl, description, setPostList }) => {
  const [liked, setLiked] = useState(false)
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const like = () => {
    setLiked(!liked)
  }

  if (description === '') setIsDescriptionEmpty(true)

  const date = new Date(post.createdAt.seconds * 1000)

  const postsCollectionRef = collection(db, 'posts')

  const getPosts = async () => {
    const data = await getDocs(query(postsCollectionRef, orderBy('createdAt', 'desc')))
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const deletePost = () => {
    const docRef = doc(db, 'posts', post.id)
    console.log(docRef)
    deleteDoc(docRef)
      .then(() => {
        console.log('Entire Document has been deleted successfully.')
      })
      .catch((error) => {
        console.log(error)
      })
    getPosts()
  }

  const handleClick = () => {
    setIsOpened(!isOpened)
  }

  return (
    <>
      <div className='post'>
        <div className='post-header'>
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

          {post.user_ID === user.sub ? (
            <div className='options-container'>
              <button className='edit' onClick={handleClick}>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
              </button>
              <div className={isOpened ? 'opened' : 'closed'}>
                <button>
                  <img src='https://img.icons8.com/ios-glyphs/344/edit--v1.png' alt='' /> Edit
                </button>
                <button onClick={deletePost}>
                  <img src='https://img.icons8.com/ios-glyphs/344/filled-trash.png' alt='' /> Delete
                </button>
              </div>
            </div>
          ) : null}
          {/* <div className='options'>
            <button onClick={deletePost}>Delete</button>
            <button>Edit</button>
          </div> */}
        </div>
        {!isDescriptionEmpty && (
          <div className='post-header-desc'>
            <p>{post.description}</p>
          </div>
        )}
        {imageUrl && (
          <div className='post-main'>
            <img src={post.image} alt='' />
          </div>
        )}
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
