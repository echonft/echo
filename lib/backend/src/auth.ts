import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { error } from '@echo/backend/helpers/logger'
import { discordProfileSchema } from '@echo/backend/validators/discord-profile-schema'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import NextAuth, { type NextAuthResult } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, either, isNil } from 'ramda'
import { generateNonce } from 'siwe'

const {
  handlers: { GET, POST },
  auth
}: NextAuthResult = NextAuth({
  callbacks: {
    jwt: function ({ token, user }) {
      if (isNilOrEmpty(user)) {
        return token
      }
      return assoc('user', user, token)
    },
    session: function ({ session, token }) {
      if (either(isNil, propIsNil<typeof token, 'user'>('user'))(token)) {
        return session
      }
      return assoc('user', token.user, session)
    }
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    Discord({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile: async (profile: DiscordProfile, _token) => {
        await initializeFirebase()
        const nonce = generateNonce()
        const user = discordProfileSchema.parse(profile)
        try {
          await addUser({ nonce, user })
          return { id: user.username, username: user.username }
        } catch (err) {
          error({ err, user }, AuthError.AddUser)
          return { id: user.username, username: user.username }
        }
      }
    })
  ]
})

export { GET, POST, auth }
