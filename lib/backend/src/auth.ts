import { baseAuthConfig } from '@echo/backend/auth-config'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { error } from '@echo/backend/helpers/logger'
import { discordProfileSchema } from '@echo/backend/validators/discord-profile-schema'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import NextAuth, { type NextAuthResult } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { generateNonce } from 'siwe'

const {
  handlers: { GET, POST },
  auth
}: NextAuthResult = NextAuth({
  ...baseAuthConfig,
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
