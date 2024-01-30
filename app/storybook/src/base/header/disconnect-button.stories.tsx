// noinspection JSUnusedGlobalSymbols

import '@echo/ui-css/index.css'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { account } from '@echo/storybook/mocks/account'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { chain } from '@echo/storybook/mocks/chain'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { signOut } from '@echo/storybook/mocks/sign-out'
import { DisconnectButton as Component } from '@echo/ui/components/base/header/disconnect-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header/Disconnect Button',
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

export const DisconnectButton: StoryObj<typeof Component> = {
  args: {
    fetcher: {
      addWallet,
      getNonce,
      signNonce
    },
    provider: {
      account: account('connected'),
      chain: chain('connected'),
      signOut
    },
    renderConnect: () => null,
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
