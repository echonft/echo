// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { account } from '@echo/storybook/mocks/account'
import { addWallet } from '@echo/storybook/mocks/add-wallet'
import { chain } from '@echo/storybook/mocks/chain'
import { getNonce } from '@echo/storybook/mocks/get-nonce'
import { signNonce } from '@echo/storybook/mocks/sign-nonce'
import { signOut } from '@echo/storybook/mocks/sign-out'
import { HeaderLoggedIn as Component } from '@echo/ui/components/base/header/header-logged-in'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
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

export const LoggedIn: StoryObj<typeof Component> = {
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
