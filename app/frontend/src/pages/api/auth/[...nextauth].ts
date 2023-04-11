import { authCallbackOptions } from '@echo/api'
import { getAuthOptions } from '@echo/api-auth'
import NextAuth from 'next-auth'

export default NextAuth(getAuthOptions(authCallbackOptions))
