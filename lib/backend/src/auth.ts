import Credentials from '@auth/core/providers/credentials'
import { credentialsSchema } from '@echo/backend/validators/credentials-schema'
import { addUser } from '@echo/firestore/crud/user/add-user'
import { getUserSnapshotByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { chainById } from '@echo/model/helpers/chain/chain-by-id'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import NextAuth, { type NextAuthResult, type User } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, dissoc, either, isNil, objOf, pipe } from 'ramda'

const {
  handlers: { GET, POST },
  auth
}: NextAuthResult = NextAuth({
  callbacks: {
    jwt: function ({ token, user }) {
      console.log(`-------- JWT CALLBACK ----------`)
      console.log(`token ${JSON.stringify(token)}`)
      if (!isNil(user)) {
        return assoc('user', dissoc('id', user), token)
      }
      return token
    },
    session: function ({ session, token }) {
      console.log(`-------- SESSION CALLBACK ----------`)
      console.log(`token ${JSON.stringify(token)}`)
      console.log(`session ${JSON.stringify(session)}`)
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
    Credentials({
      credentials: {},
      authorize: async (credentials): Promise<User> => {
        const { address, chainId } = await credentialsSchema.parseAsync(credentials)
        await initializeFirebase()
        const wallet = walletFromContract({ address, chain: chainById(chainId) })
        const snapshot = await getUserSnapshotByWallet(wallet)
        if (isNil(snapshot)) {
          return pipe(addUser, objOf('id'), assoc('wallet', wallet))(wallet) as unknown as User
        }
        const user = snapshot.data()
        if (isNil(user.username)) {
          return { id: snapshot.id, wallet: wallet } as User
        }
        return { id: snapshot.id, ...user } as User
      }
    }),
    Discord({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile: async (profile: DiscordProfile, token) => {
        console.log(`-------- PROFILE ----------`)
        console.log(`profile ${JSON.stringify(profile)}`)
        console.log(`token ${JSON.stringify(token)}`)
        // return await pipe(fetch, andThen(pipe(parseResponse(userSchema), assoc('id', profile.id))))(
        //   apiPathProvider.user.update.getUrl(),
        //   {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify(token)
        //   }
        // )
        // return parseResponse(userSchema)(profile)
        return profile
      }
    })
  ]
})

export { GET, POST, auth }
