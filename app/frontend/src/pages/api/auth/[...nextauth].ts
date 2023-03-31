import { authOptions } from '@echo/api'
import NextAuth from 'next-auth'

// TODO Should be in {{@echo/api}} but we have a problem exporting
// const authOptions: AuthOptions = {
//   providers: [
//     DiscordProvider({
//       clientId: discordConfig.clientId,
//       clientSecret: discordConfig.clientSecret,
//       authorization: getAuthorizationUrl()
//     })
//   ],
//   pages: {
//     signIn: '/login',
//     signOut: '/logout'
//   },
//   // TODO Validate the persistence of session
//   callbacks: {
//     async jwt({ token, account }) {
//       // No firebase token means user is not logged in firebase
//       if (account) {
//         // TODO Add claims (roles)
//         return createOrUpdateUser(account.access_token, account.token_type, token.sub).then((userResult) => {
//           if (R.isError(userResult)) {
//             throw Error('Auth error: error creating or updating user')
//           }
//
//           return { ...token, user: R.getExn(userResult) }
//         })
//       }
//       return token
//     },
//     session({ session, token: { user } }) {
//       // Should never happen, only for type guarding
//       if (isNil(user)) {
//         throw Error('Auth error: invalid token data')
//       }
//       // Inject user in session
//       return { ...session, user }
//     }
//   }
// }
export default NextAuth(authOptions)
