import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { AuthUser } from '@echo/model/types/auth-user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { Login as Component } from '@echo/ui/components/auth/login'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignNonceArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const address: Lowercase<HexString> = '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
const chainId = 11155111
function accountProvider(state: 'connected' | 'connecting' | 'disconnected') {
  switch (state) {
    case 'connected':
      return {
        address,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false
      }
    case 'connecting':
      return {
        address: undefined,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false
      }
    case 'disconnected':
      return {
        address: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false
      }
  }
}
function chainProvider(state: 'connected' | 'connecting' | 'disconnected') {
  if (state === 'connected') {
    return chainId
  }
  return undefined
}
function addWallet(_args: AddWalletRequest) {
  return delayPromise(Promise.resolve({}), 1200)
}
function getNonce() {
  return delayPromise(Promise.resolve({ nonce: 'nonce' }), 1200)
}
function signNonce(_args: SignNonceArgs) {
  return delayPromise(Promise.resolve({ message: 'message', signature: address }), 1200)
}

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login',
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

type Story = StoryObj<typeof Component>

export const Login: Story = {
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
        provider={{ signIn, chain: () => chainProvider(connectState), account: () => accountProvider(connectState) }}
        renderConnectWallet={() => (
          <WalletConnectButton loading={connectState === 'connecting'} onClick={onConnect} label={'Connect Wallet'} />
        )}
        user={user}
        wallets={[{ address, chainId }]}
        onFinish={onFinish}
      />
    )
  }
}
