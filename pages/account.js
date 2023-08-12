import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'

function Account() {
    const { data: session } = useSession();
  return (
    <div>
        Signin
        
    </div>
  )
}

export default Account