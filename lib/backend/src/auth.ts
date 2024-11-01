import { discordProfileSchema } from '@echo/backend/validators/discord-profile-schema'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addUser, type AddUserArgs, type AddUserReturn } from '@echo/firestore/crud/user/add-user'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import NextAuth, { type NextAuthResult, type User } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { andThen, assoc, dissoc, either, isNil, objOf, path, pipe } from 'ramda'
import { generateNonce } from 'siwe'

const {
  handlers: { GET, POST },
  auth
}: NextAuthResult = NextAuth({
  callbacks: {
    jwt: function ({ token, user }) {
      if (!isNil(user)) {
        return assoc('user', dissoc('id', user), token)
      }
      return token
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
        return pipe<
          [DiscordProfile],
          UserDocument,
          Record<'user', UserDocument>,
          AddUserArgs,
          Promise<AddUserReturn>,
          Promise<User>
        >(
          (profile) => discordProfileSchema.parse(profile),
          objOf('user'),
          assoc('nonce', nonce),
          addUser,
          andThen(pipe(path(['user', 'data']), userDocumentToModel, assoc('id', profile.id)))
        )(profile)
      }
    })
  ]
})

export { GET, POST, auth }
