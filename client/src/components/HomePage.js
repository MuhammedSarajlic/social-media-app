import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Post from './Post'
import { storage, db } from './Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getDocs, serverTimestamp, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import { v4 } from 'uuid'

const LogoutButton = () => {
  const { logout, user } = useAuth0()

  const [imageUrl, setImageUrl] = useState(null)
  const [desc, setDesc] = useState('')
  const [postList, setPostList] = useState([])
  const [postID, setPostID] = useState('')

  const postsCollectionRef = collection(db, 'posts')

  const del = () => {
    const docRef = doc(db, 'posts', postID)
    deleteDoc(docRef).then(() => {
      console.log('Entire Document has been deleted successfully.')
    })
  }

  const getPosts = async () => {
    const data = await getDocs(query(postsCollectionRef, orderBy('createdAt', 'desc')))
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const onFileChange = async (e) => {
    const image = e.target.files[0]
    const imageRef = ref(storage, `images/${image.name}${v4()}`)
    await uploadBytes(imageRef, image)
    setImageUrl(await getDownloadURL(imageRef))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (imageUrl === null && desc === '') return
    let id = v4()
    await addDoc(postsCollectionRef, {
      // id: id,
      createdAt: serverTimestamp(),
      description: desc,
      image: imageUrl,
      user_ID: user.sub,
      username: user.nickname,
      user_avatar: user.picture,
    })
    getPosts()
    setDesc('')
  }

  useEffect(() => {
    getPosts()
    console.log(postList)
  }, [])

  return (
    <>
      <div className='header'>
        <h1>logo</h1>
        <input type='text' placeholder='Search...' />
        <div className='profile-options'>
          <p>{user.nickname}</p>
          <img src={user.picture} alt='' />
          <button onClick={() => logout()}>Log Out</button>
        </div>
      </div>
      <div className='main'>
        <div className='left-section'>
          <div className='add-post'>
            <p>Add Post</p>
            <input value={postID} type='text' placeholder='id...' onChange={(e) => setPostID(e.target.value)} />
            <button onClick={del}>Delete</button>
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
              <Post key={post.id} user={user} post={post} imageUrl={post.image} desc={post.description} />
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
