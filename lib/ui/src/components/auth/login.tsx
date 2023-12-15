'use client'
import { signIn } from 'next-auth/react'
import { type FunctionComponent, useEffect } from 'react'

export const Login: FunctionComponent = () => {
  useEffect(() => {
    void signIn('discord')
  }, [])
  return null
}
