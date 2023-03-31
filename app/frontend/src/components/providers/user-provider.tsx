import { useFirebaseAuth } from '@echo/firebase-react'
import { logger } from '@echo/utils'
import { useSession } from 'next-auth/react'
import React, { createContext, FunctionComponent, PropsWithChildren, useEffect, useState } from 'react'

export interface CurrentUser {
  loggedInFirebase: boolean
  // logout?: (args?: number) => Promise<void>
  // // wallet stuff
  // walletConnected?: boolean
  // address: string | undefined
  // connectWallet?: (args?: Partial<ConnectArgs> | undefined | number) => Promise<ConnectResult | void>
  // disconnectWallet?: (args?: number) => Promise<void>
}

const userContext = createContext<CurrentUser | null>(null)

export const UserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { auth } = useFirebaseAuth()
  const { data: session } = useSession()

  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    loggedInFirebase: false
  })
  // listen for app auth changes
  useEffect((): void => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          logger.debug(`auth state changed - user id ${user.uid}`)
        } else {
          logger.debug('auth state changed - user disconnected')
        }
      },
      (error) => {
        logger.error('onAuthStateChanged error', error)
      }
    )
    return unsubscribe()
  }, [auth, setCurrentUser])
  //
  // // listen for changes on user
  // useEffect((): void => {
  //   if (config.appEnvironment === AppEnvironment.MOCK) {
  //     setCurrentUser((previousUser) => ({
  //       ...previousUser,
  //       address: previousUser.walletConnected ? currentUserMock.id : undefined,
  //       login: (args) =>
  //         PromiseWithDelay(true, args).then(() => {
  //           setCurrentUser((previousValue) => ({ ...previousValue, loggedIn: true, userId: currentUserMock.id }))
  //         }),
  //       logout: (args) =>
  //         PromiseWithDelay(true, args).then(() => {
  //           setCurrentUser((previousValue) => ({ ...previousValue, loggedIn: false, userId: undefined }))
  //         }),
  //       connectWallet: (args) =>
  //         PromiseWithDelay(true, args as number).then(() => {
  //           setCurrentUser((previousValue) => ({
  //             ...previousValue,
  //             walletConnected: true,
  //             address: currentUserMock.id
  //           }))
  //         }),
  //       disconnectWallet: (args) =>
  //         PromiseWithDelay(true, args).then(() => {
  //           setCurrentUser((previousValue) => ({ ...previousValue, walletConnected: false, address: undefined }))
  //         })
  //     }))
  //   } else {
  //     setCurrentUser((previousUser) => ({
  //       ...previousUser,
  //       address,
  //       login: () =>
  //         refetchSigner()
  //           .then((signer) =>
  //             login(firebaseInitialized, authApiUrl, signer.data, address)
  //               .then((result) => {
  //                 logger.debug(`logged in - user id ${result?.user?.uid}`)
  //                 return result
  //               })
  //               .catch((error) => {
  //                 logger.error(`Error logging in: ${error.message}`)
  //                 throw error
  //               })
  //           )
  //           .catch((error) => {
  //             logger.error(`Error getting signer: ${error.message}`)
  //             throw error
  //           }),
  //       logout: () =>
  //         signOut(getAuth())
  //           .then(() => {
  //             logger.debug(`logged out`)
  //           })
  //           .catch((error) => {
  //             logger.error(`Error logging out: ${error.message}`)
  //             throw error
  //           }),
  //       connectWallet: (args?: Partial<ConnectArgs> | undefined) =>
  //         connectAsync(args)
  //           .then((result) => {
  //             logger.debug(`wallet connected - address: ${result.account}`)
  //             setCurrentUser((previousValue) => ({ ...previousValue, walletConnected: true, address: result.account }))
  //             return result
  //           })
  //           .catch((error) => {
  //             logger.error(`Error connecting wallet: ${error.message}`)
  //             throw error
  //           }),
  //       disconnectWallet: () =>
  //         disconnectAsync()
  //           .then(() => {
  //             logger.debug(`wallet disconnected`)
  //             setCurrentUser((previousValue) => ({ ...previousValue, walletConnected: false, address: undefined }))
  //           })
  //           .catch((error) => {
  //             logger.error(`Error disconnecting wallet: ${error.message}`)
  //             throw error
  //           }),
  //       walletConnected: isConnected
  //     }))
  //   }
  // }, [
  //   firebaseInitialized,
  //   authApiUrl,
  //   address,
  //   disconnectAsync,
  //   connectAsync,
  //   isConnected,
  //   refetchSigner,
  //   logger,
  //   setCurrentUser
  // ])
  //
  // // update user profile
  // useEffect((): void => {
  //   setCurrentUser((previousUser) => ({
  //     ...previousUser,
  //     profile
  //   }))
  // }, [profile, setCurrentUser])
  //
  // // if at any point the user wallet address does not match with the logged-in user, we need to log them out
  // // or
  // // if the user disconnects their wallet we need to log them off
  // useEffect((): void => {
  //   const { loggedIn, userId } = currentUser
  //   if (loggedIn && (!isConnected || getAddress(userId) !== getAddress(address))) {
  //     signOut(getAuth())
  //   }
  // }, [currentUser, address, isConnected])
  //
  // // log errors
  // useEffect((): void => {
  //   if (!isNil(profileError)) {
  //     logger.error(`Error getting current user's profile: ${profileError.message}`)
  //   }
  // }, [logger, profileError])

  return <userContext.Provider value={currentUser}>{children}</userContext.Provider>
}

export const useCurrentUser = (): CurrentUser | undefined => {
  const contextValue = React.useContext(userContext)
  if (!contextValue) {
    throw new Error('useCurrentUser must be used within UserProvider.')
  }
  return contextValue
}
