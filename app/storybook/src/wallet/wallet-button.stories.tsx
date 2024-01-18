// noinspection JSUnusedGlobalSymbols

import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { WalletButton as Component } from '@echo/ui/components/wallet/wallet-button'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignNonceArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { type Meta, type StoryObj } from '@storybook/react'
import { omit } from 'ramda'
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
  return delayPromise(Promise.resolve({}), 500)
}
function getNonce() {
  return delayPromise(Promise.resolve({ nonce: 'nonce' }), 500)
}
function signNonce(_args: SignNonceArgs) {
  return delayPromise(Promise.resolve({ message: 'message', signature: address }), 500)
}

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Wallet Button',
  component: Component,
  decorators: [
    (Story) => {
      return (
        <>
          <Web3Provider>
            <Story />
          </Web3Provider>
          <CalloutManager />
        </>
      )
    }
  ],
  parameters: {
    controls: {
      exclude: ['fetcher', 'provider', 'renderConnect', 'user']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => {
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
        user={omit(['wallets'], user)}
      />
    )
  }
}

export const WalletAlreadyLinked: Story = {
  render: () => {
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
      />
    )
  }
}

export const GetNonceError: Story = {
  render: () => {
    function getNonceError() {
      return delayPromise(Promise.reject({ error: 'error' }), 1200)
    }

    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{ addWallet, getNonce: getNonceError, signNonce }}
        provider={{ account: () => accountProvider(connectState), chain: () => chainProvider(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={omit(['wallets'], user)}
      />
    )
  }
}

export const SignNonceError: Story = {
  render: () => {
    function signNonceError(_args: SignNonceArgs) {
      return delayPromise(Promise.reject({ error: 'error' }), 1200)
    }

    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{ addWallet, getNonce, signNonce: signNonceError }}
        provider={{ account: () => accountProvider(connectState), chain: () => chainProvider(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={omit(['wallets'], user)}
      />
    )
  }
}

export const AddWalletError: Story = {
  render: () => {
    function addWalletError(_args: AddWalletRequest) {
      return delayPromise(Promise.reject({}), 1200)
    }

    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')

    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{ addWallet: addWalletError, getNonce, signNonce }}
        provider={{ account: () => accountProvider(connectState), chain: () => chainProvider(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={omit(['wallets'], user)}
      />
    )
  }
}
