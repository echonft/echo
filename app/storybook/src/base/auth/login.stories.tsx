// noinspection JSUnusedGlobalSymbols

import type { AuthUser } from '@echo/model/types/auth-user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { account } from '@echo/storybook/mocks/account'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { chain } from '@echo/storybook/mocks/chain'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { Login as Component } from '@echo/ui/components/auth/login'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login',
  component: Component,
  argTypes: {
    onFinish: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['fetcher', 'provider', 'renderConnectWallet', 'user', 'wallets']
    }
  }
}

export default metadata

export const Login: StoryObj<typeof Component> = {
  render: ({ onFinish }) => {
    const [user, setUser] = useState<AuthUser>()
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }
    const signIn = () => {
      setTimeout(() => {
        setUser(getAuthUserMockByUsername('crewnft_'))
      }, 1200)
      return Promise.resolve(undefined)
    }
    return (
      <Component
        fetcher={{ addWallet, getNonce, signNonce }}
        provider={{ signIn, chain: chain(connectState), account: account(connectState) }}
        renderConnectWallet={() => (
          <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />
        )}
        user={user}
        onFinish={onFinish}
      />
    )
  }
}
