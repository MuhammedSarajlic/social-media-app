// import { collection, getDocs, orderBy, query } from "firebase/firestore"
// import { useState } from "react"
// import { db } from "../components/Firebase"

// const postsCollectionRef = collection(db, 'posts')

// export const GetPosts = () => {
//     const [postList, setPostList] = useState([])

//     const getFetch = async () => {
//         const data = await getDocs(query(postsCollectionRef, orderBy('createdAt', 'desc')))
//         setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//     }
//     getFetch()

// }


// export default GetPosts