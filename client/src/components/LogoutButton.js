import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Post from './Post'
import { storage, db } from './Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

const LogoutButton = () => {
  const { logout, user } = useAuth0()

  const [imageUrl, setImageUrl] = useState(null)
  const [desc, setDesc] = useState('')

  const collectionRef = collection(db, 'posts')

  const onFileChange = async (e) => {
    const image = e.target.files[0]
    const imageRef = ref(storage, `images/${image.name}${user.sub}`)
    await uploadBytes(imageRef, image)
    setImageUrl(await getDownloadURL(imageRef))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    addDoc(collectionRef, {
      description: desc,
      image: imageUrl,
      user_ID: user.sub,
    })
  }

  useEffect(() => {
    console.log('Effect Uplaod', desc, imageUrl)
  }, [imageUrl])

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
                name='description'
                placeholder='Say something...'
                onChange={(e) => setDesc(e.target.value)}
              />
              <input type='file' accept='image/*' onChange={onFileChange} />
              <button>Post</button>
            </form>
          </div>
          <div className='posts'>
            {/* {arr.map(() => ( */}
            <Post user={user} />
            {/* ))} */}
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
