// noinspection JSUnusedGlobalSymbols

import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { AuthUser } from '@echo/model/types/auth-user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { account } from '@echo/storybook/mocks/account'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { chain } from '@echo/storybook/mocks/chain'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { WalletButton as Component } from '@echo/ui/components/wallet/wallet-button'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import { type Meta, type StoryObj } from '@storybook/react'
import { omit, pipe } from 'ramda'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Wallet/Wallet Button',
  component: Component,
  args: {
    fetcher: {
      addWallet: addWallet,
      getNonce: getNonce,
      signNonce: signNonce
    },
    user: pipe<[string], AuthUser, AuthUser>(getAuthUserMockByUsername, omit(['wallets']))('johnnycagewins')
  },
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

export const Default: StoryObj<typeof Component> = {
  render: ({ fetcher, user }) => {
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={fetcher}
        provider={{ account: account(connectState), chain: chain(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={omit(['wallets'], user)}
      />
    )
  }
}

export const WalletAlreadyLinked: StoryObj<typeof Component> = {
  render: ({ fetcher }) => {
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={fetcher}
        provider={{ account: account(connectState), chain: chain(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={getAuthUserMockByUsername('johnnycagewins')}
      />
    )
  }
}

export const GetNonceError: StoryObj<typeof Component> = {
  render: ({ fetcher: { addWallet, signNonce }, user }) => {
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{
          addWallet,
          getNonce: function () {
            return delayPromise(Promise.reject({ error: 'error' }), 1200)
          },
          signNonce
        }}
        provider={{ account: account(connectState), chain: chain(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={user}
      />
    )
  }
}

export const SignNonceError: StoryObj<typeof Component> = {
  render: ({ fetcher: { addWallet, getNonce }, user }) => {
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{
          addWallet,
          getNonce,
          signNonce: function (_args: SignNonceArgs) {
            return delayPromise(Promise.reject({ error: 'error' }), 1200)
          }
        }}
        provider={{ account: account(connectState), chain: chain(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={user}
      />
    )
  }
}

export const AddWalletError: StoryObj<typeof Component> = {
  render: ({ fetcher: { signNonce, getNonce }, user }) => {
    const [connectState, setConnectState] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
    const onConnect = () => {
      setConnectState('connecting')
      setTimeout(() => {
        setConnectState('connected')
      }, 1200)
    }

    return (
      <Component
        fetcher={{
          addWallet: function (_args: AddWalletRequest) {
            return delayPromise(Promise.reject({}), 1200)
          },
          getNonce,
          signNonce
        }}
        provider={{ account: account(connectState), chain: chain(connectState) }}
        renderConnect={() => <ConnectWalletButton isConnecting={connectState === 'connecting'} onClick={onConnect} />}
        user={user}
      />
    )
  }
}
