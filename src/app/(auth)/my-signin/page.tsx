'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <form action="">
        <button onClick={()=>signIn()}>Sign in</button>
    </form>
  )
}
