'use client'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { isPathSecure } from '@echo/routing/path/is-path-secure'
import type { PathString } from '@echo/routing/types/path-string'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { base64Encode } from '@echo/utils/helpers/base64-encode'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { disconnectWallet } from '@echo/web3-dom/services/disconnect-wallet'
import type { AccountResultConnected } from '@echo/web3-dom/services/get-account'
import { signNonce } from '@echo/web3-dom/services/sign-nonce'
import type { Session } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useRef } from 'react'
import { debounce } from 'throttle-debounce'

interface Props {
  session: Nullable<Session>
}

export const AuthManager: FunctionComponent<Props> = ({ session }) => {
  const pathname = usePathname()
  const loggingIn = useRef(false)
  const loggingOut = useRef(false)
  const switchingChain = useRef(false)
  const { switchChain, logout, login } = useDependencies()
  console.log(`SESSION: ${JSON.stringify(session)}`)

  async function discordSignIn() {
    console.log(`discord login`)
    await login({
      provider: 'discord'
    })
    console.log(`SUCCESS discord login`)
  }
  async function signIn({ address, chain }: AccountResultConnected) {
    console.log(`logging in`)
    const csrfToken = await getCsrfToken()
    const { message, signature } = await signNonce({ address, chain, nonce: csrfToken })
    await login({
      provider: 'credentials',
      params: {
        message: base64Encode(message),
        signature
      }
    })
    console.log(`SUCCESS login`)
  }
  const onConnect = debounce(
    800,
    async (account: AccountResultConnected) => {
      console.log('CONNECTED')
      if (!loggingIn.current) {
        loggingIn.current = true
        if (isNilOrEmpty(session)) {
          loggingIn.current = true
          try {
            await signIn(account)
          } catch (err) {
            console.log((err as Error).message)
            console.log('disconnecting wallet')
            await disconnectWallet()
            console.log('SUCCESS disconnected wallet')
          } finally {
            loggingIn.current = false
          }
        } else if (isNil(session.user?.username)) {
          try {
            await discordSignIn()
          } catch (err) {
            console.log((err as Error).message)
          } finally {
            loggingIn.current = false
          }
        }
      }
    },
    { atBegin: true }
  )
  const onDisconnect = debounce(
    800,
    async () => {
      console.log('DISCONNECTED')
      if (!loggingOut.current && !isNilOrEmpty(session)) {
        loggingOut.current = true
        if (isPathSecure(pathname as PathString)) {
          await logout({ redirectTo: pathProvider.base.home.getUrl() })
        } else {
          await logout()
        }
        loggingOut.current = false
      }
    },
    { atBegin: true }
  )
  const onUnsupportedChain = debounce(
    800,
    async () => {
      if (!switchingChain.current) {
        switchingChain.current = true
        await switchChain()
        switchingChain.current = false
      }
    },
    { atBegin: true }
  )

  useAccount({ onConnect, onDisconnect, onUnsupportedChain })
  return null
}
