// noinspection JSUnusedGlobalSymbols

import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { HeaderLoggedIn as Component } from '@echo/ui/components/layout/header/header-logged-in'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { SignNonceArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { type Meta, type StoryObj } from '@storybook/react'
import type { SignOutParams } from 'next-auth/react'

const user = getAuthUserMockByUsername('johnnycagewins')
const wallet = user.wallets![0]!
const { address, chainId } = wallet
function account() {
  return {
    address,
    isConnected: true,
    isConnecting: false,
    isDisconnected: false,
    isReconnecting: false
  }
}
function chain() {
  return chainId
}
function addWallet(_args: AddWalletRequest) {
  return delayPromise(Promise.resolve({}), 200)
}
function getNonce() {
  return delayPromise(Promise.resolve({ nonce: 'nonce' }), 200)
}
function signNonce(_args: SignNonceArgs) {
  return delayPromise(Promise.resolve({ message: 'message', signature: address }), 200)
}

function signOut(_options: SignOutParams<true> | undefined) {
  return delayPromise(Promise.resolve(undefined), 1200)
}

const metadata: Meta<typeof Component> = {
  title: 'Base/Layout/Header',
  component: Component,
  argTypes: {
    onSignOut: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['callbackUrl', 'fetcher', 'provider', 'renderConnect', 'user', 'wallets']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoggedIn: Story = {
  args: {
    fetcher: {
      addWallet,
      getNonce,
      signNonce
    },
    provider: {
      account,
      chain,
      signOut
    },
    renderConnect: () => null,
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
