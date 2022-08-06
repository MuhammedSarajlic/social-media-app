import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Post from './Post'
import { storage, db } from './Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getDocs, serverTimestamp, orderBy, query } from 'firebase/firestore'

const LogoutButton = () => {
  const { logout, user } = useAuth0()

  const [imageUrl, setImageUrl] = useState(null)
  const [desc, setDesc] = useState('')
  const [postList, setPostList] = useState([])

  const postsCollectionRef = collection(db, 'posts')
  const usersCollectionRef = collection(db, 'users')

  const addUser = () => {}

  const onFileChange = async (e) => {
    const image = e.target.files[0]
    const imageRef = ref(storage, `images/${image.name}${user.sub}`)
    await uploadBytes(imageRef, image)
    setImageUrl(await getDownloadURL(imageRef))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    addDoc(postsCollectionRef, {
      createdAt: serverTimestamp(),
      description: desc,
      image: imageUrl,
      user_ID: user.sub,
      username: user.nickname,
      user_avatar: user.picture,
    })
    // setPostList((prev) => [
    //   ...prev,
    //   {
    //     createdAt: datetime,
    //     description: desc,
    //     image: imageUrl,
    //     user_ID: user.sub,
    //   },
    // ])
    setDesc('')
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(postsCollectionRef, orderBy('createdAt', 'desc')))
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [])

  return (
    <>
      <div className='header'>
        <h1>logo</h1>
        <input type='text' placeholder='Search...' />
        <div className='profile-options'>
          <p>{user.nickname}</p>
          <img src={user.picture} alt={user.name} />
          <button onClick={() => logout()}>Log Out</button>
        </div>
      </div>
      <div className='main'>
        <div className='left-section'>
          <div className='add-post'>
            <p>Add Post</p>
            <form onSubmit={onSubmit}>
              <input
                type='text'
                value={desc}
                name='description'
                placeholder='Say something...'
                onChange={(e) => setDesc(e.target.value)}
              />
              <input type='file' accept='image/*' onChange={onFileChange} />
              <button>Post</button>
            </form>
          </div>
          <div className='posts'>
            {postList.map((post) => (
              <Post key={post.id} user={user} post={post} />
            ))}
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