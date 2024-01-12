import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { LoginConnectWalletStep as Component } from '@echo/ui/components/auth/login-connect-wallet-step'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignNonceArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const user = getAuthUserMockByUsername('johnnycagewins')
const wallet = user.wallets![0]!
const { address, chainId } = wallet
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
  title: 'Auth/Login/Connect Wallet Step',
  component: Component,
  argTypes: {
    onContinue: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['fetcher', 'provider', 'renderConnect', 'wallets']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const NotConnected: Story = {
  render: ({ onContinue }) => {
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{ addWallet, getNonce, signNonce }}
        provider={{ account: () => accountProvider(connectState), chain: () => chainProvider(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={user}
        onContinue={onContinue}
      />
    )
  }
}

export const Connected: Story = {
  args: {
    fetcher: { addWallet, getNonce, signNonce },
    provider: { account: () => accountProvider('connected'), chain: () => chainProvider('connected') },
    renderConnect: () => null,
    user
  }
}
