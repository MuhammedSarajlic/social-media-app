import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import JSONPretty from 'react-json-pretty'

const Profil = () => {
    const {user} = useAuth0()

  return (
    <div>
        <JSONPretty data={user}/>
    </div>
  )
}

export default Profil