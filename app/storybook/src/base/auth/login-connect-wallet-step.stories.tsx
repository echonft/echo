// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { account } from '@echo/storybook/mocks/account'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { chain } from '@echo/storybook/mocks/chain'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { LoginConnectWalletStep as Component } from '@echo/ui/components/auth/login-connect-wallet-step'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Connect Wallet Step',
  args: {
    fetcher: { addWallet, getNonce, signNonce },
    user: getAuthUserMockByUsername('johnnycagewins')
  },
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
      exclude: ['fetcher', 'provider', 'renderConnect', 'user']
    }
  }
}
export default metadata

export const NotConnected: StoryObj<typeof Component> = {
  render: ({ fetcher, user, onContinue }) => {
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
        user={user}
        onContinue={onContinue}
      />
    )
  }
}

export const Connected: StoryObj<typeof Component> = {
  args: {
    provider: { account: account('connected'), chain: chain('connected') },
    renderConnect: () => null
  }
}
