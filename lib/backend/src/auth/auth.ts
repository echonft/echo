import { baseAuthConfig } from '@echo/backend/auth/auth-config'
import { fetchDiscordAccessToken } from '@echo/backend/auth/discord/fetch-discord-access-token'
import { fetchDiscordProfile } from '@echo/backend/auth/discord/fetch-discord-profile'
import { revokeDiscordAccessToken } from '@echo/backend/auth/discord/revoke-discord-access-token'
import { isUserWhitelisted } from '@echo/backend/helpers/is-user-whitelisted'
import { error } from '@echo/backend/helpers/logger'
import { credentialsSchema } from '@echo/backend/validators/credentials-schema'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { User } from '@echo/model/types/user'
import { addressSchema } from '@echo/model/validators/address-schema'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import NextAuth, { type NextAuthResult } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { andThen, assoc, isNil, otherwise, pipe, prop, tap } from 'ramda'
import { SiweMessage } from 'siwe'

const {
  handlers: { GET, POST },
  auth
}: NextAuthResult = NextAuth({
  ...baseAuthConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { code, csrfToken, message, signature } = credentialsSchema.parse(credentials)
          const siweMessage = new SiweMessage(message)
          const {
            data: { nonce, address }
          } = await siweMessage.verify({
            signature
          })
          if (nonce !== csrfToken) {
            error('invalid signature')
            return null
          }
          const wallet = addressSchema.parse(address)
          const isWhitelisted = await isUserWhitelisted(wallet)
          if (!isWhitelisted) {
            error({ wallet }, 'user is not whitelisted')
            return null
          }
          if (isNil(code)) {
            await initializeFirebase()
            const user = await getUserByWallet(wallet)
            if (isNil(user)) {
              error({ wallet }, 'code not provided and user is not found')
              return null
            } else {
              return userDocumentToModel(user)
            }
          }
          const token = await fetchDiscordAccessToken(code)
          const userDocument = await fetchDiscordProfile(token)
          await initializeFirebase()
          return await pipe(
            assoc('wallet', wallet),
            addUser,
            andThen(
              pipe(
                tap(() => {
                  void pipe(
                    revokeDiscordAccessToken,
                    otherwise((err) => {
                      error({ err }, 'could not revoke access token')
                    })
                  )(token)
                }),
                unlessNil(pipe<[NewDocument<UserDocument>], UserDocument, User>(prop('data'), userDocumentToModel))
              )
            ),
            otherwise(async (err) => {
              error({ err, user: assoc('wallet', wallet, userDocument) }, 'could not add user')
              await pipe(
                revokeDiscordAccessToken,
                otherwise((err) => {
                  error({ err }, 'could not revoke access token')
                })
              )(token)
              return null
            })
          )(userDocument)
        } catch (err) {
          error({ err }, 'login error')
          return null
        }
      }
    })
  ]
})

export { auth, GET, POST }
